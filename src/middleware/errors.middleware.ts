import { ErrorMiddleware, ERROR_MIDDLEWARE } from '@decorators/express';
import { HttpError } from 'http-errors';

import { Injectable, Container } from '@decorators/di';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from 'express-jwt';

@Injectable()
export class ServerErrorMiddleware implements ErrorMiddleware {
  public use(error: Error, _req: Request, res: Response, _next: NextFunction) {
    if (
      error instanceof HttpError ||
      error instanceof UnauthorizedError
    ) {
      res.status(error.status).send(error.message); 
      return;
    }

    res.sendStatus(500);
  }
}

Container.provide([
  { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware }
]);
