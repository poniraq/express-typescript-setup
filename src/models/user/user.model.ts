import { ModelName, Render } from 'utils/annotations';
import { Group } from 'models';
import { BelongsTo, Column, Default, ForeignKey, Scopes } from 'sequelize-typescript';
import { BaseUserMeta, USER_ROLE } from './base';


@Scopes({
  active: {
    where: { active: true }
  },
  inactive: {
    where: { active: false }
  }
})
@ModelName('User')
class User extends BaseUserMeta()<User> {
  @Render
  @Default(USER_ROLE.USER)
  @Column
  role: string;

  @Render
  @ForeignKey(() => Group)
  @Column
  groupId: number;

  @Render
  @BelongsTo(() => Group)
  group: Group
}

export { User, User as default };
