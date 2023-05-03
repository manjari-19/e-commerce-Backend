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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cart_1 = require("../services/cart");
const cartServiceInstance = new cart_1.CartService();
class CartController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            cartServiceInstance.addToCart(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            cartServiceInstance.getCartById(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    readAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            cartServiceInstance.getCarts(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            cartServiceInstance.updateCart(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            cartServiceInstance.deleteCart(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
}
exports.CartController = CartController;
