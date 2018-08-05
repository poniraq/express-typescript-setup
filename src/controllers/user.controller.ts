import { Injectable } from '@decorators/di';
import { Body, Controller, Delete, Get, Next, Put, Request, Response } from '@decorators/express';
import { NextFunction, Request as Req, Response as Res } from 'express';
import { AuthMiddleware, UserMiddleware } from 'middleware';
import { ParametersMiddleware } from 'middleware/parameters';
import { Admin, User } from 'models';
import { RenderService } from 'services';


@Injectable()
@Controller('/user', [
  AuthMiddleware,
  UserMiddleware()
])
export default class UserController {
  constructor(
    protected renderer: RenderService
  ) {}


  /**
   * Get current user data 
   */
  @Get('/')
  index(
    @Request() req: Req,
    @Response() res: Res,
    @Next() next: NextFunction
  ) {
    const user: User | Admin = req.user_instance;
    const renderer = this.renderer;

    Promise.resolve()
      .then(() => renderer.json(user))
      .then(user => res.send(user))
      .catch(next)
  }

  /**
   * Update current user
   */
  @Put('/', [
    ParametersMiddleware({
      remove: ['role']
    })
  ])
  update(
    @Request() req: Req,
    @Response() res: Res,
    @Body() payload: any,
    @Next() next: NextFunction
  ) {
    const user: User | Admin = req.user_instance;
    const renderer = this.renderer;

    Promise.resolve()
      .then(() => user.update(payload))
      .then(user => renderer.json(user))
      .then(user => res.send(user))
      .catch(next)
  }

  /**
   * Destroy current user 
   */
  @Delete('/')
  delete(
    @Request() req: Req,
    @Response() res: Res,
    @Next() next: NextFunction
  ) {
    const user: User | Admin = req.user_instance;

    Promise.resolve()
      .then(() => user.destroy())
      .then(() => res.sendStatus(200))
      .catch(next)
  }
}