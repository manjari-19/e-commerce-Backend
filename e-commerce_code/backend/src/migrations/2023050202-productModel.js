'use strict';

const Sequelize = require('sequelize')
module.exports = {
  async up(queryInterface, sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      price: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status:{
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('products');
  }
};
