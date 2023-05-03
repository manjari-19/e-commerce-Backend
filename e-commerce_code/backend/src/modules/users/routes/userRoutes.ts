import { Router } from "express";
import { UserController } from "../controllers/userController";


class MainRouter {

    router: Router;
    user: UserController
    constructor() {
        this.user = new UserController()
        this.router = Router({ mergeParams: true })
        this.userRouters()
    }

    userRouters() {
        this.router.route(`/api/v1/user`)
            .post(this.user.createUser)
        this.router.route(`/api/v1/user/:userId`)
            .patch(this.user.updateUser)
        this.router.route(`/api/v1/user/:userId`)
            .delete(this.user.deleteUser)
        this.router.route(`/api/v1/user/:userId`)
            .get(this.user.getUsersById)
        this.router.route(`/api/v1/users`)
            .get(this.user.getUsers)
        this.router.route(`/api/v1/login`)
            .post(this.user.login)

    }

}
export default new MainRouter().router
