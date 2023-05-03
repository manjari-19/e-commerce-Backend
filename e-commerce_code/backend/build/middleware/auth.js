"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const logger_1 = require("../utils/logger");
const jwt = require("jsonwebtoken");
const TOKEN_KEY = 'smartSolution';
class Auth {
    constructor() {
        this.verifyToken = (req, res, next) => {
            const token = req === null || req === void 0 ? void 0 : req.headers["x-access-token"];
            if (!token) {
                return res.status(403).send("A token is required for authentication");
            }
            try {
                const decoded = jwt.verify(token, TOKEN_KEY);
                req.user = decoded;
                next();
            }
            catch (err) {
                logger_1.logger.error(err);
                return res.status(401).send("Invalid Token");
            }
            return next();
        };
    }
}
exports.Auth = Auth;
