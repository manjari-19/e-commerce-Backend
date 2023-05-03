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
            yield queryInterface.createTable('users', {
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
                status: {
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
        });
    },
    down(queryInterface, sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add reverting commands here.
             *
             * Example:
             */
            yield queryInterface.dropTable('users');
        });
    }
};
