import { Body, Delete, Get, Next, Params, Post, Put, Query, Request, Response } from '@decorators/express';
import { NextFunction, Request as Req, Response as Res } from 'express';
import { NotFound } from 'http-errors';
import { IFindOptions, Model, NonAbstractTypeOfModel } from 'sequelize-typescript';


export class CRUDController<T extends Model<T>> {
  constructor(
    protected model: NonAbstractTypeOfModel<T>
  ) { }

  @Get('/')
  index(
    @Request() _req: Req,
    @Response() res: Res,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 0
  ) {
    this.$all(page, limit)
      .then(items => items.map(this.$render))
      .then(items => res.send(items))
  }

  @Get('/:id')
  read(
    @Request() _req: Req,
    @Response() res: Res,
    @Params('id') id: string,
    @Next() next: NextFunction
  ) {
    this.$one(id)
      .then(this.$render)
      .then(item => res.send(item))
      .catch(next)
  }

  @Post('/')
  create(
    @Request() _req: Req,
    @Response() res: Res,
    @Body() payload: any,
    @Next() next: NextFunction
  ) {
    this.$create(payload)
      .then(this.$render)
      .then(item => res.send(item))
      .catch(next)
  }

  @Put('/:id')
  update(
    @Request() _req: Req,
    @Response() res: Res,
    @Params('id') id: string,
    @Body() payload: any,
    @Next() next: NextFunction
  ) {
    this.$update(id, payload)
      .then(this.$render)
      .then(item => res.send(item))
      .catch(next)
  }

  @Delete('/:id')
  delete(
    @Request() _req: Req,
    @Response() res: Res,
    @Params('id') id: string,
    @Next() next: NextFunction
  ) {
    this.$delete(id)
      .then(() => res.sendStatus(200))
      .catch(next)
  }


  // UTILS
  protected $render(model: T) {
    return model.toJSON();
  }

  protected $all(page: number = 0, limit: number = 0) {
    const options: IFindOptions<T> = {};
    const offset = (page - 1) * limit;

    if (page > 0 && limit > 0) {
      options.offset = offset;
      options.limit = limit;
    }

    return this.model.all(options);
  }

  protected $one(id: any) {
    return this.model.scope('defaultScope')
      .findById(id)
      .tap(item => {
        if (!item) throw new NotFound();
      });
  }

  protected $create(payload: any) {
    return this.model.create(payload);
  }

  protected $update(id: any, payload: any) {
    return this.$one(id).then(item => item.update(payload));
  }

  protected $delete(id: any) {
    return this.$one(id).then(item => item.destroy());
  }
}

export function CRUDControllerMeta<T extends Model<T>>() {
  return class MetaClass extends CRUDController<T>{ };
}