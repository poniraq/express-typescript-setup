import * as configs from 'config/database';
import { resolve } from 'path';
import { Sequelize } from 'sequelize-typescript';


const env = process.env.NODE_ENV || 'development';
const config = configs[env];
config.modelPaths = [
  resolve(__dirname, './**/*.model.js')
];

export { User, Admin, GenericUser } from './user';

const sequelize = new Sequelize(config);
export { sequelize, sequelize as default };