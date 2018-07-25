import { Sequelize } from 'sequelize-typescript';
import { resolve } from 'path';

import * as configs from 'config/database';


const env = process.env.NODE_ENV || 'development';
const config = configs[env];
config.modelPaths = [
  resolve(__dirname, '../models/*.model.ts'),
  resolve(__dirname, '../models/*.model.js')
];

const sequelize = new Sequelize(config);


export * from './user.model';
export {
  sequelize,

  sequelize as default
}