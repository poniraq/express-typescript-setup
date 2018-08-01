import { NonAbstractTypeOfModel } from 'sequelize-typescript';
import Admin from './admin.model';
import User from './user.model';

export type GenericUser = NonAbstractTypeOfModel<User> | NonAbstractTypeOfModel<Admin>;
export * from './user.model';
export * from './admin.model';
export * from './base';