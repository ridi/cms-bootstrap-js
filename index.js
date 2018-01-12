require('babel-polyfill');
const express = require('express');
const Cookies = require('cookies');
const { CmsSdk, CmsSession } = require('@ridi/cms-sdk');

const sdk = new CmsSdk({
  cmsRpcUrl: 'http://admin.dev.ridi.com',
});

async function authorizer(req, res, next) {
  console.log(req.url);

  req.cmsSession = new CmsSession(sdk);
  const cookies = new Cookies(req, null);
  const token = cookies.get('cms-token');

  const data = await req.cmsSession.shouldRedicrectForLogin(token);

  if (!data || !data.user_id) {
    const loginUrl = sdk.getLoginPageUrl(req.url);
    res.redirect(req.baseUrl + loginUrl);
    return;
  }

  const allowed = await req.cmsSession.authorizeUrl(req.method, req.url);
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
  const menus = await req.cmsSession.getUserMenus();
  res.json(menus);
});

// forbiden
app.get('/example/', (req, res) => {
  res.send(req.cmsSession.getLoginId());
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
