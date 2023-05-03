"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
class MainRouter {
    constructor() {
        this.product = new productController_1.ProductController();
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.productRouter();
    }
    productRouter() {
        console.log("product access");
        this.router.route(`/api/v1/product`)
            .post(this.product.create);
        this.router.route(`/api/v1/product/:productId`)
            .patch(this.product.update);
        this.router.route(`/api/v1/product/:productId`)
            .delete(this.product.delete);
        this.router.route(`/api/v1/product/:productId`)
            .get(this.product.readAll);
        this.router.route(`/api/v1/products`)
            .get(this.product.readAll);
    }
}
exports.default = new MainRouter().router;
