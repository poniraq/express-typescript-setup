import AuthController from './auth';
import UserController from './user';

const all = [
  AuthController,
  UserController
];

export {
  AuthController,
  UserController,

  all,
  all as default
}