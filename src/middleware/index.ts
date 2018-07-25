import { Router } from 'express';

import RequestIdMiddleware = require('express-request-id');
import { ParserMiddleware } from './parsers';

const middleware = Router();

middleware.use(RequestIdMiddleware());
middleware.use(ParserMiddleware);

export default middleware;
