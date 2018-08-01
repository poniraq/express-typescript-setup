import { IIncludeAssociation, Model, IIncludeOptions } from 'sequelize-typescript';
import { IBaseIncludeOptions } from 'sequelize-typescript/lib/interfaces/IBaseIncludeOptions';
import { NonAbstract } from 'sequelize-typescript/lib/utils/types';

declare module 'sequelize-typescript' {
  export type NonAbstractTypeOfModel<T> = (new () => T) & NonAbstract<typeof Model>;

  /**
   * Complex include options
   */
  export interface IExtIncludeOptions extends IBaseIncludeOptions {
    /**
     * The model you want to eagerly load
     */
    model?: typeof Model;
    /**
     * The association you want to eagerly load. (This can be used instead of providing a model/as pair)
     */
    association?: IIncludeAssociation | string;
    /**
     * Load further nested related models
     */
    include?: Array<typeof Model | IExtIncludeOptions>;
    /**
     * If true, only non-deleted records will be returned. If false, both deleted and non-deleted records will
     * be returned. Only applies if `options.paranoid` is true for the model.
     */
    paranoid?: boolean;
  }

  export interface IIncludeFindOptions {
    include?: IExtIncludeOptions[];
  }
}