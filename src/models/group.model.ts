import { Admin, User } from 'models';
import { BaseModelMeta } from 'models/base';
import { BelongsTo, Column, CreatedAt, ForeignKey, Table, UpdatedAt, HasMany, AllowNull } from 'sequelize-typescript';
import { Render } from 'utils/annotations';

@Table({
  timestamps: true,
  tableName: 'Groups'
})
class Group extends BaseModelMeta()<Group> {
  @Render
  @CreatedAt
  createdAt: Date;
 
  @Render
  @UpdatedAt
  updatedAt: Date;

  @Render
  @AllowNull
  @ForeignKey(() => Admin)
  @Column
  ownerId?: number;

  @Render
  @BelongsTo(() => Admin)
  owner?: Admin

  @Render
  @HasMany(() => User, 'groupId')
  users: User[]
}

export { Group, Group as default };
