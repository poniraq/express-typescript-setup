import { Model } from 'sequelize-typescript';
import { pick, clone } from 'lodash';

function safeJSON() {
  const data = clone(
    this.get({
      plain: true
    })
  );

  return pick(data, this.$safe_fields);
}

export function Render(target: any, propertyName: string): void {
  target.toJSON = safeJSON;

  target.$safe_fields = target.$safe_fields || [];
  target.$safe_fields.push(propertyName);
}

export abstract class BaseModel<T extends Model<T>> extends Model<T> {
  // put common logic here

  @Render
  id: number;
}