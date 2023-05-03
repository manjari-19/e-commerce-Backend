"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class MainRouter {
    constructor() {
        this.user = new userController_1.UserController();
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.userRouters();
    }
    userRouters() {
        console.log("routes access");
        this.router.route(`/api/v1/user`)
            .post(this.user.createUser);
        this.router.route(`/api/v1/user/:userId`)
            .patch(this.user.updateUser);
        this.router.route(`/api/v1/user/:userId`)
            .delete(this.user.deleteUser);
        this.router.route(`/api/v1/user/:userId`)
            .get(this.user.getUsersById);
        this.router.route(`/api/v1/users`)
            .get(this.user.getUsers);
        this.router.route(`/api/v1/login`)
            .post(this.user.login);
    }
}
exports.default = new MainRouter().router;
