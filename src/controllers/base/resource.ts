import { Response as Res } from 'express';
import { NotFound } from 'http-errors';
import {
  Get, Response, Params,
  Post, Body, Put, Delete, Next
} from '@decorators/express';

import { Model, NonAbstractTypeOfModel } from 'sequelize-typescript';


export abstract class ResourceController <T extends Model<T>> {
  constructor(
    protected model: NonAbstractTypeOfModel<T>
  ) { }

  @Get('/')
  index(
    @Response() res: Res
  ) {
    this.model
    .all()
    .then(items => items.map(item => item.toJSON()))
    .then(items => res.send(items))
  }

  @Get('/:id')
  read(
    @Response() res: Res,
    @Params('id') id: string,
    @Next() next
  ) {
    this.model
      .findById(id)
      .tap(item => {
        if (!item) throw new NotFound();
      })
      .then(item => res.send(item.toJSON()))
      .catch(next)
  }

  @Post('/')
  create(
    @Response() res: Res,
    @Body() payload: any,
    @Next() next
  ) {
    this.model
      .create(payload)
      .then(item => res.send(item.toJSON()))
      .catch(next)
  }

  @Put('/:id')
  update(
    @Response() res: Res,
    @Params('id') id: string,
    @Body() payload: any,
    @Next() next
  ) {
    this.model
      .findById(id)
      .tap(item => {
        if (!item) throw new NotFound();
      })
      .then(item => item.update(payload))
      .then(item => res.send(item.toJSON()))
      .catch(next)
  }

  @Delete('/:id')
  delete(
    @Response() res: Res,
    @Params('id') id: string,
    @Next() next
  ) {
    this.model
      .findById(id)
      .tap(item => {
        if (!item) throw new NotFound();
      })
      .then(item => item.destroy())
      .then(() => res.sendStatus(200))
      .catch(next)
  }
}