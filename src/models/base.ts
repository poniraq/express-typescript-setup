import { Model } from 'sequelize-typescript';
import { Render } from 'utils/annotations';

export abstract class BaseModel<T extends Model<T>> extends Model<T> {
  // put common logic here

  @Render
  id: number;
}

export function BaseModelMeta (){
  return class MetaClass<T extends Model<T>> extends BaseModel<T> {};
}