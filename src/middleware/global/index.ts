import { Router } from 'express';
import { ParserMiddleware } from './parsers';
import { RequestIdMiddleware } from './request-id';


const GlobalMiddleware = Router();

GlobalMiddleware.use(RequestIdMiddleware);
GlobalMiddleware.use(ParserMiddleware);

export { GlobalMiddleware, GlobalMiddleware as default };
