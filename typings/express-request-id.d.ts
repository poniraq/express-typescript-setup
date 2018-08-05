declare module 'express-request-id' {
  import { RequestHandler } from 'express';
  
  function RequestIdMiddleware(...args: any[]): RequestHandler;
  export = RequestIdMiddleware;
}