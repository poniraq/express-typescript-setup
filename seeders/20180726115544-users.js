'use strict';

const Promise = require('bluebird');
const { Admin } = require('models');

module.exports = {
  up: async (q, Sequelize) => {
    return Promise.resolve()
      .then(() => {
        return Admin.create({
          name: 'John Doe',
          email: 'john.doe@seed.com',
          phone: '+00-000-000-00-00',
          active: true,
          password: 'test',
          role: 'ADMIN',
        });
      });
  },

  down: (q, Sequelize) => {
    return Admin.destroy({
      where: {
        email: 'john.doe@seed.com'
      }
    })
  }
};
