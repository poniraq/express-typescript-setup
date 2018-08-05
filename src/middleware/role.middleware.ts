import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from 'http-errors';
import { USER_ROLE } from 'models/user';

export function RoleMiddleware(role: USER_ROLE) {
  return class implements Middleware {
    use(request: Request, _response: Response, next: NextFunction): void {
      if (request.user.role !== role) next(new Unauthorized());
      next();
    }
  }
}
