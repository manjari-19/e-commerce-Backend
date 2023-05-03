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
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exception_1 = __importDefault(require("../../../exceptions/exception"));
const userModel_1 = __importDefault(require("../models/userModel"));
const constants_1 = require("../../../utils/constants");
const logger_1 = require("../../../utils/logger");
const cartItemModel_1 = __importDefault(require("../../cartItem/models/cartItemModel"));
const TOKEN_KEY = 'EcommerseSite';
class UserService {
    constructor() {
    }
    // for create user
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body || req;
            const username = req.body.username;
            try {
                // const userExist = await User.findOne({where:{username:req.body.username}})
                // if(!userExist){
                //     logger.info("user Already exist with this userName")
                // }
                const encryptedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
                req.body.password = encryptedPassword;
                // Create user in our database
                const user = yield userModel_1.default.create(req.body);
                const cart = yield this.assignCartToUser(user);
                console.log("-----------------", cart);
                // Create token
                const token = jsonwebtoken_1.default.sign({ user_id: user.dataValues.id, username }, TOKEN_KEY, {
                    expiresIn: "2h",
                });
                console.log("token----", token);
                // save user token
                user.dataValues.token = token;
                // return new user
                res.status(201).json(user);
                return Promise.resolve(user);
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    //for user updation
    updateUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.params.userId || req.params.id;
                let userExist = yield userModel_1.default.findOne({ where: { id: userId } });
                if (!userExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, "user not exist");
                }
                let updateObj = req.body || req.data;
                yield userModel_1.default.update(updateObj, { where: { userId: userId } });
                let updatedUser = yield userModel_1.default.findOne({ where: { userId: userId } });
                return Promise.resolve(updatedUser);
            }
            catch (error) {
                logger_1.logger.info("Error while Updating User", error);
                return Promise.reject(error);
            }
        });
    }
    //delete user by id
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId || req.params.id;
                let userExist = yield userModel_1.default.findOne({ where: { userId: userId } });
                if (!userExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, "user not exist");
                }
                //to delete user
                yield userModel_1.default.destroy({ where: { userId: userId } });
                return Promise.resolve("user deleted successfully.");
            }
            catch (error) {
                logger_1.logger.info("Error while Deleting User", error);
                return Promise.reject(error);
            }
        });
    }
    //get all users
    getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.findAll({ include: { model: cartItemModel_1.default, as: 'cartItems' } });
                return Promise.resolve(users);
            }
            catch (error) {
                logger_1.logger.info("Error while getting All User", error);
                return Promise.reject(error);
            }
        });
    }
    //get users by id
    getUsersById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.params.userId || req.params.id;
                let userExist = yield userModel_1.default.findOne({ where: { userId: userId }, include: { model: cartItemModel_1.default, as: 'cartItems' } });
                if (!userExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, "user not exist");
                }
                return Promise.resolve(userExist);
            }
            catch (error) {
                logger_1.logger.info("Error while getting UserById", error);
                return Promise.reject(error);
            }
        });
    }
    login(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get user input
                const { username, password } = req.body;
                // Validate if user exist in our databas
                // const user = await User.findOne({ username:username });
                const user = yield userModel_1.default.findOne({ where: { username: username } });
                console.log("user exist password------1234567890", user);
                if (!user) {
                    logger_1.logger.info("user not exist");
                }
                const pwd = yield bcryptjs_1.default.compare(password, (_a = user === null || user === void 0 ? void 0 : user.dataValues) === null || _a === void 0 ? void 0 : _a.password);
                if (((_b = user === null || user === void 0 ? void 0 : user.dataValues) === null || _b === void 0 ? void 0 : _b.status) == "inactive") {
                    logger_1.logger.info;
                }
                // Validate user input
                if (!pwd) {
                    logger_1.logger.info("password not matched");
                }
                if (user && (yield password, (_c = user === null || user === void 0 ? void 0 : user.dataValues) === null || _c === void 0 ? void 0 : _c.password)) {
                    // Create token
                    const token = jsonwebtoken_1.default.sign({ user_id: (_d = user === null || user === void 0 ? void 0 : user.dataValues) === null || _d === void 0 ? void 0 : _d.id, username }, TOKEN_KEY, {
                        expiresIn: "2h",
                    });
                    // save user token
                    user.dataValues.token = token;
                    // user.roleName = userRole
                    return Promise.resolve(user);
                }
            }
            catch (err) {
                logger_1.logger.error("Error in Login ", err);
                return Promise.reject(err);
            }
        });
    }
    assignCartToUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartId = user.dataValues.cartItemId;
                const userId = user.dataValues.id;
                const cartCreate = yield cartItemModel_1.default.create({
                    userId: userId,
                    cartId: cartId
                });
                cartCreate.save();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.UserService = UserService;
