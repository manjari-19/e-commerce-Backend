'use strict';

const Sequelize = require('sequelize')
module.exports = {
  async up(queryInterface, sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('cartItems', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      cartId: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      userId: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      productId: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      quantity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('cartItems');
  }
};
