import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from 'http-errors';
import { Admin, GenericUser, User, USER_ROLE } from 'models/user';
import { IFindOptions } from 'sequelize-typescript';
import { AbstractResourceMiddleware } from './base/resource';

function UserMiddleware(includes?: string[] | string) {
  return class extends AbstractResourceMiddleware {
    model: GenericUser;

    use(request: Request, _response: Response, next: NextFunction): void {
      if (!request.user) return next(new Unauthorized());

      const data = request.user;
      this.model = data.role === USER_ROLE.USER ? User : Admin;
      
      this.getResource(request)
        .then(user => {
          if (!user) return next(new Unauthorized());

          request.user_instance = user;
          next();
        })
    }

    getResource(req: Request) {
      return this.model.findById(req.user.id, this.getOptions(req) as IFindOptions<GenericUser>);
    }

    getIncludes(_req: Request) {
      return includes ? this.parseIncludes(includes) : null;
    }
  }
}

export { UserMiddleware, UserMiddleware as default };
