import { Router } from "express";
import { CartController } from "../controllers/cartController";


class MainRouter {

    router: Router;
    cart: CartController
    constructor() {
        this.cart = new CartController()
        this.router = Router({ mergeParams: true })
        this.cartRouter()
    }

    cartRouter() {
        this.router.route(`/api/v1/cart`)
            .patch(this.cart.create)
        this.router.route(`/api/v1/cart/:cartId`)
            .patch(this.cart.update)
        this.router.route(`/api/v1/cart/:cartId`)
            .delete(this.cart.delete)
        this.router.route(`/api/v1/cart/:cartId`)
            .get(this.cart.readAll)
        this.router.route(`/api/v1/carts`)
            .get(this.cart.readAll)

    }

}
export default new MainRouter().router
