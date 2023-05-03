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
exports.UserController = void 0;
const user_1 = require("../services/user");
const userServiceInstance = new user_1.UserService();
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userServiceInstance.createUser(req, res).then((result) => {
                console.log(result);
                res.send(result);
                ;
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userServiceInstance.login(req).then((result) => {
                console.log(result);
                res.send(result);
                ;
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    getUsersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userServiceInstance.getUsersById(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userServiceInstance.getUser(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userServiceInstance.updateUser(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userServiceInstance.deleteUser(req).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
}
exports.UserController = UserController;
