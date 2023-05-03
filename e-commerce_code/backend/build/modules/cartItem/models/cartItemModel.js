"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../config/db"));
const sequelize_1 = require("sequelize");
const userModel_1 = __importDefault(require("../../users/models/userModel"));
const productModel_1 = __importDefault(require("../../products/models/productModel"));
// Database connection instance
const databaseInstance = db_1.default;
// Sequelize Model
const CartItems = databaseInstance.define('cartItems', {
    id: {
        type: sequelize_1.UUID,
        defaultValue: sequelize_1.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    cartId: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    productId: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    quantity: {
        type: sequelize_1.INTEGER,
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
});
CartItems.belongsTo(userModel_1.default, { as: "users", foreignKey: 'userId' });
userModel_1.default.hasOne(CartItems, { as: "cartItems", foreignKey: 'cartId' });
CartItems.belongsTo(productModel_1.default, { as: "products", foreignKey: 'productId' });
productModel_1.default.hasMany(CartItems, { as: 'cartItems', foreignKey: 'cartId' });
// {
//   // Auto-create timestamps
//   timestamps: true,
//   createdAt: 'createdAt',
//   updatedAt: 'updatedAt',
//   // Enable soft deletes
//   paranoid: true,
// }
exports.default = CartItems;
