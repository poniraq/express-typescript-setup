import { Column, Default } from 'sequelize-typescript';
import { ModelName, Render } from 'utils/annotations';
import { BaseUserMeta, USER_ROLE } from './base';

@ModelName('User')
class User extends BaseUserMeta()<User> {
  @Render
  @Default(USER_ROLE.USER)
  @Column
  role: string;
}

export { User, User as default };
