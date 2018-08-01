'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      
      name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING },
      active: { type: Sequelize.BOOLEAN, defaultValue: false },

      role: { type: Sequelize.STRING, defaultValue: 'USER' },
      adminId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};