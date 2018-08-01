'use strict';

const Promise = require('bluebird');

module.exports = {
  up: (q, Sequelize) => {
    const createGroups = () => {
      return q.createTable('Groups', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        
        createdAt: { type: Sequelize.DATE, allowNull: false },
        updatedAt: { type: Sequelize.DATE, allowNull: false },
        
        ownerId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        },
      });
    }

    const modifyUser = () => {
      return Promise.resolve()
      .then(() => q.removeColumn('Users', 'adminId'))
      .then(() => q.addColumn('Users', 'groupId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Groups',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }));
    }
    
    return Promise.resolve()
      .then(() => createGroups())
      .then(() => modifyUser())
  },

  down: (q, Sequelize) => {
    const modifyUser = () => {
      return Promise.resolve()
      .then(() => q.removeColumn('Users', 'groupId'))
      .then(() => q.addColumn('Users', 'adminId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      }));
    }

    const dropGroups = () => {
      return q.dropTable('Groups');
    }

    return Promise.resolve()
      .then(() => modifyUser())
      .then(() => dropGroups())
  }
};
