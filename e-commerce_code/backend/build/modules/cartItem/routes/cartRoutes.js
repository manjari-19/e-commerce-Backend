"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
class MainRouter {
    constructor() {
        this.cart = new cartController_1.CartController();
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.cartRouter();
    }
    cartRouter() {
        this.router.route(`/api/v1/cart`)
            .post(this.cart.create);
        this.router.route(`/api/v1/cart/:cartId`)
            .patch(this.cart.update);
        this.router.route(`/api/v1/cart/:cartId`)
            .delete(this.cart.delete);
        this.router.route(`/api/v1/cart/:cartId`)
            .get(this.cart.readAll);
        this.router.route(`/api/v1/carts`)
            .get(this.cart.readAll);
    }
}
exports.default = new MainRouter().router;
