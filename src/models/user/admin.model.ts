import { ModelName, Render } from 'utils/annotations';
import { Group } from 'models';
import { AfterCreate, Column, Default, DefaultScope, HasOne, Scopes } from 'sequelize-typescript';
import { BaseUserMeta, USER_ROLE } from './base';


@DefaultScope({
  where: { role: USER_ROLE.ADMIN }
})
@Scopes({
  active: {
    where: { active: true, role: USER_ROLE.ADMIN }
  },
  inactive: {
    where: { active: false, role: USER_ROLE.ADMIN }
  }
})
@ModelName('Admin')
class Admin extends BaseUserMeta()<Admin> {
  @Render
  @Default(USER_ROLE.ADMIN)
  @Column
  role: string;

  @HasOne(() => Group)
  group?: Group


  // HOOKS
  @AfterCreate
  static createGroup(instance: Admin) {
    return Group.create({
      ownerId: instance.id
    });
  }
}

export { Admin, Admin as default };
