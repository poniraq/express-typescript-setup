import { Injectable } from '@decorators/di';
import { compare } from 'bcrypt';
import { JwtSecret } from 'config/secrets';
import { sign } from 'jsonwebtoken';
import { User } from 'models';
import { promisify } from 'util';
import _ = require('lodash');

const signAsync = promisify(sign);

@Injectable()
export class AuthService {

  // todo: implement
  sendCode(user: User) {
    const code = '1234';

    return Promise.resolve()
      .then(() => user.update({ activationCode: code }))
      .then(() => code);
  }

  confirmCode(user: User, code: string) {
    return Promise.resolve()
      .then(() => user.activationCode === code)
      .then(matches => {
        if (matches) {
          user.update({
            active: true,
            activationCode: null
          });

          return matches;
        }
      })
  }

  initialize(user: User, payload: object) {
    const props = ['name', 'email', 'password'];
    const data = _.pick(payload, props);
    const valid = _.every(props, (prop) => _.includes(Object.keys(data), prop));

    return Promise.resolve()
      .then(() => {
        if (!valid) return Promise.reject(valid);

        return user.update(data);
      })
  }

  token(user: User) {
    const payload = {
      id: user.id,
      phone: user.phone,
      active: user.active,
      role: user.role,
      initialized: user.initialized
    };

    return signAsync(payload, JwtSecret);
  }

  compare(password: string, hash: string) {
    return Promise.resolve()
      .then(() => compare(password, hash))
  }
}