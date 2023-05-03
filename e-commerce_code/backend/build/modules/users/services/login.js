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
exports.Login = void 0;
const logger_1 = require("../../../utils/logger");
const userModel_1 = __importDefault(require("../models/userModel"));
const constants_1 = require("../../../utils/constants");
const exception_1 = __importDefault(require("../../../exceptions/exception"));
var localConstant = require('../utils/constants');
const TOKEN_KEY = 'EcommerseSite';
class Login {
    constructor() {
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get user input
                const { username, password } = req.body;
                // Validate if user exist in our databas
                // const user = await User.findOne({ username:username });
                const user = yield userModel_1.default.findOne({ where: { username: username } });
                console.log("user exist password------1234567890", user);
                if (!user) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.BAD_REQUEST, localConstant.ENTER_VALID_USERNAME);
                }
                // const pwd = await bcrypt.compare(password,user?.password);
                // if(user?.status == "inactive"){
                //     throw new Exceptions(ERROR_TYPE.BAD_REQUEST, 'user is inactive.')
                //   }
                // Validate user input
                // if(!pwd){
                //     throw new Exceptions(ERROR_TYPE.NOT_FOUND,localConstant.PASSWORD_NOT_MATCH)
                // }
                // if (user && (await password, user.password)) {
                //     // Create token
                //     const token = jwt.sign(
                //         { user_id: user._id, username },
                //         TOKEN_KEY,
                //         {
                //             expiresIn: "2h",
                //         }
                //     );
                // save user token
                // user.token = token;
                // user.roleName = userRole
                return Promise.resolve(user);
                // }
            }
            catch (err) {
                logger_1.logger.error("Error in Login ", err);
                return Promise.reject(err);
            }
        });
    }
}
exports.Login = Login;
