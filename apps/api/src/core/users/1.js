import express from 'express';
import cors from 'cors';
import { LATEST_API_VERSION, shopifyApi, LogSeverity } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
const app = express();
const port = 3000;

const session = null;

const shopify = shopifyApi({
  apiKey: '5a27503b533308040731c8c06b5e4237',
  apiSecretKey: '36a9659f8f7ac49a806de74178679850',
  scopes: ['read_products'],
  hostName: '83f9-171-212-235-97.ngrok-free.app',
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  logger: {
    level: LogSeverity.Debug,
  },
});

app.use(cors());

app.get('/auth', async (req, res) => {
  // if(!session) {
  //   await shopify.auth.begin({
  //     shop: shopify.utils.sanitizeShop(req.query.shop, true),
  //     callbackPath: '/auth/callback',
  //     isOnline: false,
  //     rawRequest: req,
  //     rawResponse: res,
  //   });
  // }
  res.redirect('https://78ce-171-212-235-97.ngrok-free.app');
});

app.get('/auth/callback', async (req, res) => {
  const callback = await shopify.auth.callback({
    rawRequest: req,
    rawResponse: res,
  });
  console.log('callback', callback);
  session = callback.session;
  res.redirect('https://78ce-171-212-235-97.ngrok-free.app');
});

app.get('/app', async (req, res) => {
  res.redirect('https://78ce-171-212-235-97.ngrok-free.app');
});

app.get('/fetch-some-data', async (req, res) => {
  const sessionId = await shopify.session.getCurrentId({
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  }); // use sessionId to retrieve session from app's session storage // getSessionFromStorage() must be provided by application

  const session = await getSessionFromStorage(sessionId);
  console.log('session', session); // Build a client and make requests with session.accessToken // See the REST, GraphQL, or Storefront API documentation for more information
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
