import { Controller } from '@decorators/express';

import { ResourceController } from 'controllers/base/resource';
import { User } from 'models';

@Controller('/users')
export default class UserController extends ResourceController<User> {
  constructor() {
    super(User);
  }
}