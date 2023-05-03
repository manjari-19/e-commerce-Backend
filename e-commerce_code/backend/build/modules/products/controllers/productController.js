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
exports.ProductController = void 0;
const product_1 = require("../services/product");
const productServiceInstance = new product_1.ProductService();
class ProductController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            productServiceInstance.createProduct(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            productServiceInstance.getProductById(req).then((result) => {
            }).catch((err) => {
            });
        });
    }
    readAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            productServiceInstance.getProducts(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            productServiceInstance.updateProduct(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            productServiceInstance.deleteProduct(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
}
exports.ProductController = ProductController;
