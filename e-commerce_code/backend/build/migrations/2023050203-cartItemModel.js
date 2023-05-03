'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Sequelize = require('sequelize');
module.exports = {
    up(queryInterface, sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add altering commands here.
             *
             * Example:
             */
            yield queryInterface.createTable('cartItems', {
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
        });
    },
    down(queryInterface, sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add reverting commands here.
             *
             * Example:
             */
            yield queryInterface.dropTable('cartItems');
        });
    }
};
