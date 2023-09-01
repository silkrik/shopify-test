import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { LATEST_API_VERSION, LogSeverity, shopifyApi } from '@shopify/shopify-api';
import crypto from 'crypto';

const verifyRequest = (queryString: string, hmac: any, client_secret: string) => {
  const queryParams = new URLSearchParams(queryString.slice(1));

  const receivedHmac = hmac;

  queryParams.delete('hmac');

  const paramsArray = Array.from(queryParams.entries());

  const sortedParamsArray = paramsArray.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

  const message = sortedParamsArray.map(([key, value]) => `${key}=${value}`).join('&');

  const hash = crypto.createHmac('sha256', client_secret).update(message).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(receivedHmac));
};

@Controller()
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}

  client_id = '9a510d090d2fff06af39a1556cf4750c';
  client_secret = '2e0d4b463eb05c369224c8716a908327';

  shopify = shopifyApi({
    apiKey: this.client_id,
    apiSecretKey: this.client_secret,
    scopes: ['read_products'],
    hostName: 'https://770a-171-212-112-189.ngrok-free.app',
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
    logger: {
      level: LogSeverity.Debug,
    },
  });

  @Post('auth')
  async auth(@Body() body: any, @Req() req: any, @Res() res: any) {
    const isVerify = verifyRequest(body.queryString, body.hmac, this.client_secret);

    if (isVerify) {
      const shop = this.shopify.utils.sanitizeShop(body.shop, true) || '';
      console.log('shop', shop);
      await this.shopify.auth.begin({
        shop,
        callbackPath: '/auth/callback',
        isOnline: true,
        rawRequest: req,
        rawResponse: res,
      });
    }
    return body;
  }

  @Post('auth/callback')
  async Callback(@Req() req: any, @Res() res: any) {
    const callback = await this.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
    console.log('callback', callback);
  }
}
