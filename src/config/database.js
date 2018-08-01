const { resolve } = require('path');

module.exports = {
  development: {
    driver: 'pg',
    username: 'postgres',
    password: null,
    database: 'example_db',
    host: 'localhost',
    dialect: 'postgres',

    modelPaths: [
      resolve(__dirname, '../models/**/*.model.js')
    ]
  }
}
