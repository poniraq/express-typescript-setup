import { Request, Response, NextFunction } from 'express';
import * as jwt from 'express-jwt';

import { JwtSecret } from 'config/secrets';
import { Middleware } from '@decorators/express';


const JwtHandler = jwt({
  secret: JwtSecret,
  credentialsRequired: true,
  
  getToken: (req: Request) => {
    if (req.headers.token) {
      return req.headers.token;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }

    return null;
  }
});

export class AuthMiddleware implements Middleware {
  use(request: Request, response: Response, next: NextFunction): void {
    return JwtHandler(request, response, next);
  }
};

export { AuthMiddleware as default }