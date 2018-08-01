import { Column, Default, DefaultScope } from 'sequelize-typescript';
import { ModelName, Render } from 'utils/annotations';
import { BaseUserMeta, USER_ROLE } from './base';


@DefaultScope({
  where: { role: USER_ROLE.ADMIN }
})
@ModelName('Admin')
class Admin extends BaseUserMeta()<Admin> {
  @Render
  @Default(USER_ROLE.ADMIN)
  @Column
  role: string;
}

export { Admin, Admin as default };
