import { Response, Request } from "express";
import Exception from "../../../exceptions/exception";

import Product from "../models/productModel"
import { ERROR_TYPE } from "../../../utils/constants";
import { logger } from "../../../utils/logger";




export class ProductService  {
    constructor( ) {
    }

    // for create product
    async createProduct(req: Request | any) {
        const data = req.body || req
        try {
            // let products = await Product.findOne({ where: { name: req.body.name },include: {} })
            // if (products) {

            //     throw new Exception(ERROR_TYPE.ALREADY_EXISTS, "Product already exist.")
            // }
            let product = await Product.create(data)
            return Promise.resolve(product)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    //for product updation
    async updateProduct(req: Request | any) {
        try {
            let productId = req.params.userId || req.params.id
            let productExist = await Product.findOne({ where:{id:productId }});
            if (!productExist) {
                throw new Exception(ERROR_TYPE.NOT_FOUND, "product not exist")
            }
            let updateObj: any = req.body || req.data
            await Product.update( updateObj,{where:{productId: productId}  })
            let updatedProduct = await Product.findOne({ where:{productId: productId }});

            return Promise.resolve(updatedProduct)
        }
        catch (error) {
            logger.info("Error while Updating Product",error)
            return Promise.reject(error)
        }
    }

    //delete Product by id
    async deleteProduct(req: Request | any) {
        try {
            const productId = req.params.productId || req.params.id
            let productExist: any = await Product.findOne({ where:{productId: productId} })
            if (!productExist) {
                throw new Exception(ERROR_TYPE.NOT_FOUND, "product not exist")
            }

            //to delete product
            await Product.destroy({ where:{productId: productId} })
            return Promise.resolve("product deleted successfully.")
        }
        catch (error) {
            logger.info("Error while Deleting Product",error)
            return Promise.reject(error)
        }
    }

    //get all products
    async getProducts(req: Request | any) {
        try {
            const products: any = await Product.findAll()

            return Promise.resolve(products)
        }
        catch (error) {
            logger.info("Error while getting All Products",error)
            return Promise.reject(error)
        }
    }

    //get product by id
    async getProductById(req: Request | any) {
        try {
            let productId: any = req.params.productId || req.params.id
            let productExist = await Product.findOne({ where:{productId: productId} })
            if (!productExist) {
                throw new Exception(ERROR_TYPE.NOT_FOUND, "product not exist")
            }
            return Promise.resolve(productExist)
        }
        catch (error) {
            logger.info("Error while getting ProductById",error)
            return Promise.reject(error)
        }
    }
    


}
