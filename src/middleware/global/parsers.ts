import { Router } from 'express';
import { json, urlencoded } from 'body-parser';

const ParserMiddleware = Router();

ParserMiddleware.use(json());
ParserMiddleware.use(urlencoded({ extended: true }));

export {
  ParserMiddleware,

  ParserMiddleware as default
}
