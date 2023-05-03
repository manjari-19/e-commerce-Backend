"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const exception_1 = __importDefault(require("../../../exceptions/exception"));
const cartItemModel_1 = __importDefault(require("../models/cartItemModel"));
const constants_1 = require("../../../utils/constants");
const logger_1 = require("../../../utils/logger");
class CartService {
    constructor() {
    }
    // for create cart
    addToCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productId, quantity, userId, cartId } = req.body;
            try {
                console.log("Creating cartItem", req.body, userId, cartId);
                let cartItem = yield cartItemModel_1.default.findOne({ where: { userId: userId, cartId: cartId } });
                console.log("cartItem-------------", cartItem);
                if (cartItem) {
                    if (cartItem.dataValues.quantity != 'null') {
                        const newquantity = quantity + cartItem.dataValues.quantity;
                        cartItem.dataValues.quantity = newquantity;
                        cartItem.dataValues.productId = productId;
                    }
                    cartItem.dataValues.quantity = quantity;
                    cartItem.dataValues.productId = productId;
                    yield cartItem.save();
                }
                return Promise.resolve(cartItem);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    //for cart updation
    updateCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cartId = req.params.id;
                const { quantity } = req.body;
                let cartExist = yield cartItemModel_1.default.findOne({ where: { id: cartId } });
                if (!cartExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, "cart not exist");
                }
                let updateObj = req.body;
                yield cartItemModel_1.default.update(updateObj, { where: { cartId: cartId } });
                let updatedCart = yield cartItemModel_1.default.findOne({ where: { cartId: cartId } });
                return Promise.resolve(updatedCart);
            }
            catch (error) {
                logger_1.logger.info("Error while Updating Cart", error);
                return Promise.reject(error);
            }
        });
    }
    //delete cart by id
    deleteCart(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartId = req.params.userId || req.params.id;
                let cartExist = yield cartItemModel_1.default.findOne({ where: { cartId: cartId } });
                if (!cartExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, "cart not exist");
                }
                //to delete cart
                yield cartItemModel_1.default.destroy({ where: { cartId: cartId } });
                return Promise.resolve("cart deleted successfully.");
            }
            catch (error) {
                logger_1.logger.info("Error while Deleting Cart", error);
                return Promise.reject(error);
            }
        });
    }
    //get all cart
    getCarts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield cartItemModel_1.default.findAll();
                return Promise.resolve(carts);
            }
            catch (error) {
                logger_1.logger.info("Error while getting All Carts", error);
                return Promise.reject(error);
            }
        });
    }
    //get carts by id
    getCartById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cartId = req.params.cartId || req.params.id;
                let cartExist = yield cartItemModel_1.default.findOne({ where: { cartId: cartId } });
                if (!cartExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, "cart not exist");
                }
                return Promise.resolve(cartExist);
            }
            catch (error) {
                logger_1.logger.info("Error while getting CartById", error);
                return Promise.reject(error);
            }
        });
    }
}
exports.CartService = CartService;
