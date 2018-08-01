import { Inject } from '@decorators/di';
import { Body, Controller, Delete, Get, Next, Params, Post, Request, Response } from '@decorators/express';
import { Promise } from 'bluebird';
import { Request as Req, Response as Res } from 'express';
import { NotFound } from 'http-errors';
import { merge } from 'lodash';
import { AuthMiddleware, RoleMiddleware, UserMiddleware } from 'middleware';
import { Admin, Group, User } from 'models';
import { USER_ROLE } from 'models/user';
import { RenderService } from 'services';

@Controller('/group', [
  AuthMiddleware
])
export default class GroupController {
  constructor(
    @Inject(RenderService)
    protected renderer: RenderService
  ) {
  }

  /**
   * Get user's group with it's users
   */
  @Get('/', [
    RoleMiddleware(USER_ROLE.ADMIN),
    UserMiddleware('group')
  ])
  index(
    @Request() req: Req,
    @Response() res: Res,
    @Next() next
  ) {
    const renderer = this.renderer;
    const owner = req.user_instance as Admin;

    Promise.resolve()
      .then(() => owner.group)
      .then((group: Group) => renderer.json(group))
      .then(group => res.send(group))
      .catch(next);
  }

  /**
   * Get group users
   */
  @Get('/users', [
    RoleMiddleware(USER_ROLE.ADMIN),
    UserMiddleware('group.users'),
  ])
  getUsers(
    @Request() req: Req,
    @Response() res: Res,
    @Next() next
  ) {
    const renderer = this.renderer;
    const owner = req.user_instance as Admin;

    Promise.resolve()
      .then(() => owner.group.users)
      .map(user => renderer.json(user))
      .then((data) => res.send(data))
      .catch(next);
  }

  /**
   * Insert new user
   */
  @Post('/users', [
    RoleMiddleware(USER_ROLE.ADMIN),
    UserMiddleware('group')
  ])
  insertUser(
    @Request() req: Req,
    @Response() res: Res,
    @Body() payload: any,
    @Next() next
  ) {
    const renderer = this.renderer;
    const owner = req.user_instance as Admin;

    Promise.resolve()
      .then(() => User.create(
        merge(payload, {
          groupId: owner.group.id
        })
      ))
      .then(user => renderer.json(user))
      .then(user => res.send(user))
      .catch(next);
  }

  @Delete('/users/:id', [
    RoleMiddleware(USER_ROLE.ADMIN),
    UserMiddleware('group')
  ])
  deleteUser(
    @Request() req: Req,
    @Response() res: Res,
    @Params('id') id: string,
    @Next() next
  ) {
    const renderer = this.renderer;
    const owner = req.user_instance as Admin;
    const group = owner.group;

    Promise.resolve()
      .then(() => User.find({
        where: {
          id: id,
          groupId: group.id
        }
      }))
      .then(user => {
        if (!user) throw new NotFound();
        return user.destroy();
      })
      .then(() => group.$get('users'))
      .map(user => renderer.json(user))
      .then(users => res.send(users))
      .catch(next);
  }
}