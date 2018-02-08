require('babel-polyfill');
const express = require('express');
const Cookies = require('cookies');
const { CmsSdk, CmsSession } = require('@ridi/cms-sdk');

const PORT = 8080;
const RPC_END_POINT = 'http://localhost';


const sdk = new CmsSdk({
  cmsRpcUrl: RPC_END_POINT,
});


async function authorizer(req, res, next) {
  console.log(req.url);

  req.session = new CmsSession(sdk);
  const cookies = new Cookies(req, null);
  const token = cookies.get('cms-token');

  const data = await req.session.shouldRedirectForLogin(token);

  if (!data || !data.user_id) {
    const loginUrl = sdk.getLoginPageUrl(req.url);
    res.redirect(req.baseUrl + loginUrl);
    return;
  }

  const allowed = await req.session.authorizeUrl(req.method, req.url);
  if (allowed) {
    console.log(`access allowed: ${req.url}`);
    next();
  } else {
    res.sendStatus(403);
  }
}


const app = express();

app.use(authorizer);

app.get('/example/home', async (req, res) => {
  const menus = await req.session.getUserMenus();
  res.json(menus);
});

// Forbidden
app.get('/example/', (req, res) => {
  res.send(req.session.getLoginId());
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
