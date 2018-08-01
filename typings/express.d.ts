import { User, Admin } from 'models';
import { IExtIncludeOptions } from 'sequelize-typescript';

declare module 'express' {
  export interface Request {
    id: string;
    
    user_instance?: User | Admin;
    include?: IExtIncludeOptions[]
  }
}