import { Inject } from '@decorators/di';
import { Body, Controller, Next, Post, Request, Response } from '@decorators/express';
import { Request as Req, Response as Res } from 'express';
import { BadRequest, Forbidden, NotFound, Unauthorized } from 'http-errors';
import { AuthMiddleware } from 'middleware';
import { User } from 'models';
import { AuthService } from 'services';


@Controller('/auth')
export default class AuthController {
  constructor(
    @Inject(AuthService)
    protected service: AuthService
  ) {}

  @Post('/activate')
  activate(
    @Response() res: Res,
    @Body('phone') phone: string,
    @Next() next
  ) {
    const service = this.service;

    User
      .findOne({ where: { phone: phone }})
      .tap(user => {
        this.$assertPresent(user)
        this.$assertActive(user, false)
      })
      .then(user => service.sendCode(user))
      .then(() => res.sendStatus(200))
      .catch(next)
  }

  @Post('/confirm')
  confirm(
    @Response() res: Res,
    @Body('phone') phone: string,
    @Body('code') code: string,
    @Next() next
  ) {
    const service = this.service;
    let user: User;

    User
      .findOne({ where: { phone: phone }})
      .tap(item => {
        this.$assertPresent(item)
        this.$assertActive(item, false)
        user = item;
      })
      .then(user => service.confirmCode(user, code))
      .then(matches => {
        if (!matches) throw new Unauthorized();

        return service.token(user);
      })
      .then(token => res.send(token))
      .catch(next)
  }

  @Post('/initialize', [ AuthMiddleware ])
  initialize(
    @Request() req: Req,
    @Response() res: Res,
    @Body() payload: object,
    @Next() next
  ) {
    const service = this.service;
    const id: number = req.user.id;

    User
      .findById(id)
      .tap(user => {
        this.$assertPresent(user)
        this.$assertActive(user)
        this.$assertInit(user, false)
      })
      .then((user) => service.initialize(user, payload))
      .then(
        user => service.token(user),
        () => { throw new BadRequest() }
      )
      .then(token => res.send(token))
      .catch(next)
  }

  @Post('/login')
  login(
    @Response() res: Res,
    @Body('phone') phone: string,
    @Body('password') password: string,
    @Next() next
  ) {
    const service = this.service;
    let user: User;

    User
      .findOne({ where: { phone: phone }})
      .tap(item => {
        this.$assertPresent(item)
        this.$assertActive(item)
        this.$assertInit(item)

        user = item;
      })
      .then(user => service.compare(password, user.password))
      .then(matches => {
        if (!matches) throw new Unauthorized();

        return service.token(user);
      })
      .then(token => res.send(token))
      .catch(next)
  }

  
  // UTILS
  $assertPresent(user: User, v = true) { if (!!user !== v)             throw new NotFound(); }
  $assertActive(user: User, v = true)  { if (!!user.active !== v)      throw new Forbidden(); }
  $assertInit(user: User, v = true)    { if (!!user.initialized !== v) throw new Forbidden(); }
}
