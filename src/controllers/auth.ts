import { Inject } from '@decorators/di';
import { Body, Controller, Next, Post, Response } from '@decorators/express';
import { Response as Res } from 'express';
import { Forbidden, NotFound, Unauthorized } from 'http-errors';
import { User } from 'models';
import { AuthService } from 'services';


@Controller('/auth')
export default class AuthController {
  constructor(
    @Inject(AuthService)
    protected service: AuthService
  ) {}

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
