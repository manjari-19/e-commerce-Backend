'use strict';

const Sequelize = require('sequelize')
module.exports = {
  async up(queryInterface, sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      middleName: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      contactNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      status:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      cartItemId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
      },

      // createdAt, lastUpdatedAt and deletedAt managed by Sequelize
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  async down(queryInterface, sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable('users');
  }
};
