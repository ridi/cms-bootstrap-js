require('babel-polyfill');
const express = require('express');
const Cookies = require('cookies');
const { CmsSdk, LoginSession } = require('@ridi/cms-sdk');

// If the port changes, './cms/.env' file also needs to be updated.
const PORT = 8080;
const RPC_END_POINT = 'http://localhost';

const sdk = new CmsSdk({
  cmsRpcUrl: RPC_END_POINT,
});

async function authorizer(req, res, next) {
  console.log(req.url);

  req.session = new LoginSession(sdk);
  const cookies = new Cookies(req, null);
  const token = cookies.get(req.session.getCmsTokenCookieName());

  try {
    await req.session.authorize(token, req.url);
    console.log(`access allowed: ${req.url}`);
    next();
  } catch (e) {
    console.log(e);
    const loginUrl = sdk.getLoginPageUrl(req.url);
    res.redirect(req.baseUrl + loginUrl);
  }
}

const app = express();

app.use(authorizer);

app.get('/example/home', async (req, res) => {
  res.send(`Hello! ${req.session.getLoginId()}.`);
});

app.get('/example/user/menus', async (req, res) => {
  const menus = await req.session.getUserMenus();
  res.json(menus);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
