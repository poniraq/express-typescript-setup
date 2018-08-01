import { Router } from 'express';

import RequestIdMiddleware = require('express-request-id');
import { ParserMiddleware } from './parsers';

const Middleware = Router();

Middleware.use(RequestIdMiddleware());
Middleware.use(ParserMiddleware);

export * from './errors';
export * from './association';
export * from './auth';
export * from './role';
export * from './user';

export {
  Middleware,
  ParserMiddleware,

  Middleware as default
}