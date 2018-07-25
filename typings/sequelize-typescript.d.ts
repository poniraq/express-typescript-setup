import { Model } from 'sequelize-typescript';
import { NonAbstract } from 'sequelize-typescript/lib/utils/types';

declare module 'sequelize-typescript' {
  export type NonAbstractTypeOfModel<T> = (new () => T) & NonAbstract<typeof Model>;
}