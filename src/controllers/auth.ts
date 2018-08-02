import { Inject } from '@decorators/di';
import { Body, Controller, Next, Post, Response } from '@decorators/express';
import { Response as Res } from 'express';
import { NotFound, Unauthorized } from 'http-errors';
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
    @Body('email') email: string,
    @Body('password') password: string,
    @Next() next
  ) {
    const service = this.service;
    let user: User;

    User
      .findOne({ where: { email: email }})
      .tap(item => {
        this.$assertPresent(item)

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
  $assertPresent(user: User, v = true) { if (!!user !== v) throw new NotFound(); }
}
