import { Injectable } from '@decorators/di';
import { compare } from 'bcrypt';
import { JwtSecret } from 'config/secrets';
import { sign } from 'jsonwebtoken';
import { User } from 'models';
import { promisify } from 'util';

const signAsync = promisify(sign);

@Injectable()
export class AuthService {

  token(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    return signAsync(payload, JwtSecret);
  }

  compare(password: string, hash: string) {
    return Promise.resolve()
      .then(() => compare(password, hash))
  }
}