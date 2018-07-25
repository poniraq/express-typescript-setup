import { ErrorMiddleware, ERROR_MIDDLEWARE } from '@decorators/express';
import { HttpError } from 'http-errors';

import { Injectable, Container } from '@decorators/di';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ServerErrorMiddleware implements ErrorMiddleware {
  public use(error: Error, _req: Request, res: Response, _next: NextFunction) {
    console.error(error.stack);

    if (error instanceof HttpError) {
      res.sendStatus(error.statusCode);
      return;
    }

    res.sendStatus(500);
  }
}

export function provide() {
  Container.provide([
    { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware }
  ]);
}