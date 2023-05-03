"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../config/db"));
const sequelize_1 = require("sequelize");
// Database connection instance
const databaseInstance = db_1.default;
// Sequelize Model
const Product = databaseInstance.define('products', {
    id: {
        type: sequelize_1.UUID,
        defaultValue: sequelize_1.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    image_url: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    // createdAt, lastUpdatedAt and deletedAt managed by Sequelize
    createdAt: {
        type: sequelize_1.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: sequelize_1.DATE,
        allowNull: true,
    },
}, {
    // Auto-create timestamps
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    // Enable soft deletes
    paranoid: true,
});
exports.default = Product;
