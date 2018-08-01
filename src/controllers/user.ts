import { Inject } from '@decorators/di';
import { Body, Controller, Delete, Get, Next, Put, Request, Response } from '@decorators/express';
import { Request as Req, Response as Res } from 'express';
import { AuthMiddleware, UserMiddleware } from 'middleware';
import { Admin, User } from 'models';
import { RenderService } from 'services';

@Controller('/user', [
  AuthMiddleware,
  UserMiddleware()
])
export default class UserController {
  constructor(
    @Inject(RenderService)
    protected renderer: RenderService
  ) {}

  
  @Get('/')
  index(
    @Request() req: Req,
    @Response() res: Res,
    @Next() next
  ) {
    const user: User | Admin = req.user_instance;
    const renderer = this.renderer;

    Promise.resolve()
      .then(() => renderer.json(user))
      .then(user => res.send(user))
      .catch(next)
  }

  @Put('/')
  update(
    @Request() req: Req,
    @Response() res: Res,
    @Body() payload: any,
    @Next() next
  ) {
    const user: User | Admin = req.user_instance;
    const renderer = this.renderer;

    Promise.resolve()
      .then(() => user.update(payload))
      .then(user => renderer.json(user))
      .then(user => res.send(user))
      .catch(next)
  }

  @Delete('/')
  delete(
    @Request() req: Req,
    @Response() res: Res,
    @Next() next
  ) {
    const user: User | Admin = req.user_instance;

    Promise.resolve()
      .then(() => user.destroy())
      .then(() => res.sendStatus(200))
      .catch(next)
  }
}