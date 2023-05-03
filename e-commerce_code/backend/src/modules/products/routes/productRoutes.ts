import { Router } from "express";
import { ProductController } from "../controllers/productController";


class MainRouter {

    router: Router;
    product: ProductController
    constructor() {
        this.product = new ProductController()
        this.router = Router({ mergeParams: true })
        this.productRouter()
    }

    productRouter() {
        this.router.route(`/api/v1/product`)
            .post(this.product.create)
        this.router.route(`/api/v1/product/:productId`)
            .patch(this.product.update)
        this.router.route(`/api/v1/product/:productId`)
            .delete(this.product.delete)
        this.router.route(`/api/v1/product/:productId`)
            .get(this.product.readAll)
        this.router.route(`/api/v1/products`)
            .get(this.product.readAll)

    }

}
export default new MainRouter().router
