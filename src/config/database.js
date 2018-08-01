const { resolve } = require('path');

module.exports = {
  development: {
    driver: 'pg',
    username: 'postgres',
    password: null,
    database: 'protect_dev',
    host: 'localhost',
    dialect: 'postgres',

    modelPaths: [
      resolve(__dirname, '../models/**/*.model.js')
    ]
  }
}
