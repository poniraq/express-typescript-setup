import { hash } from 'bcrypt';
import { Render } from 'utils/annotations';
import { BaseModel } from 'models/base';
import { AllowNull, BeforeSave, Column, CreatedAt, Default, IsEmail, Model, Table, UpdatedAt } from 'sequelize-typescript';

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
  @AllowNull
  @Column
  name: string;

  @Render
  @IsEmail
  @AllowNull
  @Column
  email: string;

  @Render
  @Column
  phone: string;

  @AllowNull
  @Column
  password: string;

  @Render
  @Default(false)
  @Column
  active: boolean;

  @AllowNull
  @Column
  activationCode?: string;

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


  // UTILS
  get initialized(): boolean {
    return !!(this.name && this.email && this.password);
  }
}

export function BaseUserMeta() {
  return class MetaClass<T extends Model<T>> extends BaseUser<T> {};
}

export { BaseUser as default };
