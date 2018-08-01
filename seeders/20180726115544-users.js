'use strict';

const Promise = require('bluebird');
const { User, Admin } = require('models');

module.exports = {
  up: async (q, Sequelize) => {
    return Promise.resolve()
      .then(() => Admin.create({
          email: 'admin@seed.com',
          password: 'test',
          role: 'ADMIN',
      }))
      .then(() => User.create({
        email: 'user@seed.com',
        password: 'test',
        role: 'ADMIN',
      }))
  },

  down: (q, Sequelize) => {
    return Promise.resolve()
      .then(() => Admin.destroy({
        where: {
          email: 'john.doe@seed.com'
        }
      }))
      .then(() => User.destroy({
        where: {
          email: 'john.doe@seed.com'
        }
      }));
  }
};
