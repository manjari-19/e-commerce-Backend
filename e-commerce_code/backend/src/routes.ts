import { Router } from "express"
import userRoutes from "./modules/users/routes/userRoutes"
import productRoutes from "./modules/products/routes/productRoutes"
import cartRoutes from "./modules/cartItem/routes/cartRoutes"
const mainRouter = Router()

// add module's router here in main router


mainRouter.use(userRoutes)
mainRouter.use(productRoutes)
mainRouter.use(cartRoutes)


export default mainRouter
