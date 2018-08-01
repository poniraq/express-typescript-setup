import AuthController from './auth';
import UserController from './user';
import GroupController from './group';

const all = [
  AuthController,
  UserController,
  GroupController
];

export {
  AuthController,
  UserController,
  GroupController,

  all,
  all as default
}