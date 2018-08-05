
import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';
import { IExtIncludeOptions, IIncludeFindOptions } from 'sequelize-typescript';

export abstract class AbstractResourceMiddleware implements Middleware {
  use(_request: Request, _response: Response, _next: NextFunction): void {
    throw new Error('Method not implemented.');
  }

  getResource(_req: Request) {
    throw new Error('Method not implemented.');
  }

  getOptions(req: Request) {
    const options: IIncludeFindOptions = {};
    const includes = this.getIncludes(req);

    if (includes) {
      options.include = includes;
    }

    return options;
  }

  getIncludes(req: Request) {
    const includes = (req.query.includes || '').split(',')

    return includes.length > 0 ? this.parseIncludes(includes) : null;
  }

  parseIncludes(includes: string[] | string) {
    if (!Array.isArray(includes)) {
      includes = [includes];
    }
  
    return includes.map(include => {
      const chain = include.split('.');
      
      let result: IExtIncludeOptions = {};
      let pointer: any = result;
  
      chain.forEach(token => {
        if (pointer.include) {
          pointer = pointer.include[0];
        }
  
        pointer.association = token;
        pointer.include = [{}];
      });
  
      delete pointer.include;
      return result;
    });
  }
}