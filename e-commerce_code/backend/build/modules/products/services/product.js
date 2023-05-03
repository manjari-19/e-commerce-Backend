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
exports.ProductService = void 0;
const exception_1 = __importDefault(require("../../../exceptions/exception"));
const productModel_1 = __importDefault(require("../models/productModel"));
const constants_1 = require("../../../utils/constants");
const logger_1 = require("../../../utils/logger");
class ProductService {
    constructor() {
    }
    // for create product
    createProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body || req;
            try {
                // let products = await Product.findOne({ where: { name: req.body.name },include: {} })
                // if (products) {
                //     throw new Exception(ERROR_TYPE.ALREADY_EXISTS, "Product already exist.")
                // }
                let product = yield productModel_1.default.create(data);
                return Promise.resolve(product);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    //for product updation
    updateProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productId = req.params.userId || req.params.id;
                let productExist = yield productModel_1.default.findOne({ where: { id: productId } });
                if (!productExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, "product not exist");
                }
                let updateObj = req.body || req.data;
                yield productModel_1.default.update(updateObj, { where: { productId: productId } });
                let updatedProduct = yield productModel_1.default.findOne({ where: { productId: productId } });
                return Promise.resolve(updatedProduct);
            }
            catch (error) {
                logger_1.logger.info("Error while Updating Product", error);
                return Promise.reject(error);
            }
        });
    }
    //delete Product by id
    deleteProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId || req.params.id;
                let productExist = yield productModel_1.default.findOne({ where: { productId: productId } });
                if (!productExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, "product not exist");
                }
                //to delete product
                yield productModel_1.default.destroy({ where: { productId: productId } });
                return Promise.resolve("product deleted successfully.");
            }
            catch (error) {
                logger_1.logger.info("Error while Deleting Product", error);
                return Promise.reject(error);
            }
        });
    }
    //get all products
    getProducts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productModel_1.default.findAll();
                return Promise.resolve(products);
            }
            catch (error) {
                logger_1.logger.info("Error while getting All Products", error);
                return Promise.reject(error);
            }
        });
    }
    //get product by id
    getProductById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productId = req.params.productId || req.params.id;
                let productExist = yield productModel_1.default.findOne({ where: { productId: productId } });
                if (!productExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, "product not exist");
                }
                return Promise.resolve(productExist);
            }
            catch (error) {
                logger_1.logger.info("Error while getting ProductById", error);
                return Promise.reject(error);
            }
        });
    }
}
exports.ProductService = ProductService;
