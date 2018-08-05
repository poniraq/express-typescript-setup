import { Injectable } from '@decorators/di';
import { Model } from 'sequelize-typescript';


@Injectable()
export class RenderService {
  json<T extends Model<T>>(model: T, safe = true) {
    const fields: string[] = (model as any).$safe_fields;
    let result: any = {};

    if (!fields || !safe) {
      return model.toJSON();
    }

    fields.forEach(field => {
      const value = model.get(field);

      if (value instanceof Model) {
        result[field] = this.json(value);
      } else {
        result[field] = value;
      }
    });

    return result;
  }
}
