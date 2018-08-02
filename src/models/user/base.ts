import { hash } from 'bcrypt';
import { BaseModel } from 'models/base';
import { BeforeSave, Column, CreatedAt, IsEmail, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Render } from 'utils/annotations';

export enum USER_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN'
};

@Table({
  timestamps: true,
  tableName: 'Users'
})
export abstract class BaseUser<T extends Model<T>> extends BaseModel<T> {
  @Render
  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Render
  @CreatedAt
  createdAt: Date;
 
  @Render
  @UpdatedAt
  updatedAt: Date;


  // HOOKS
  @BeforeSave
  static hashPassword<T extends Model<T>>(instance: BaseUser<T>) {
    if (instance.password && instance.changed('password')) {
      return hash(instance.password, 10).then((hashed: string) => instance.password = hashed)
    }

    return instance;
  }
}

export function BaseUserMeta() {
  return class MetaClass<T extends Model<T>> extends BaseUser<T> {};
}

export { BaseUser as default };
