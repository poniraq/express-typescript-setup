import { hash } from 'bcrypt';
import {
  Column, Table,
  CreatedAt, UpdatedAt,
  AllowNull, IsEmail, Default, BeforeSave
} from 'sequelize-typescript';

import { BaseModel, Render } from './base';


@Table({
  timestamps: true,
  tableName: 'Users'
})
class User extends BaseModel<User> {
  @Render
  @Column
  name: string;

  @Render
  @IsEmail
  @Column
  email: string;

  @Render
  @Column
  phone: string;

  @Column
  password: string;

  @Render
  @AllowNull
  @Default(false)
  @Column
  active: boolean;

  @Render
  @CreatedAt
  createdAt: Date;
 
  @Render
  @UpdatedAt
  updatedAt: Date;

  // HOOKS
  @BeforeSave
  static hashPassword(instance: User) {
    if (instance.isNewRecord) {
      return hash(instance.password, 10).then((hashed: string) => instance.password = hashed)
    }

    return instance;
  }
}

export {
  User,
  User as default
}