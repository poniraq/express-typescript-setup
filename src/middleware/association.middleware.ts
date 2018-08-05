import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';


class AssociationMiddleware implements Middleware {
  use(request: Request, _response: Response, next: NextFunction): void {
    const includeQuery: string = request.query.include;
    const associations = includeQuery.split(',');

    request.include = associations.map(association => {
      return { association: association };
    });
    next();
  }
}

export { AssociationMiddleware, AssociationMiddleware as default };
