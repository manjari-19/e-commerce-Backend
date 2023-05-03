'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const express_validator_1 = require("express-validator");
const logger_1 = require("./logger");
const constants_1 = require("./constants");
class Validator {
    constructor(rules) {
        this.rules = rules;
    }
    makeValidation(key) {
        try {
            if (!key) {
                throw new Error(`Invalid validator key '${key}' supplied.`);
            }
            this.rules[key];
            return [
                ...this.rules[key],
                (req, res, next) => {
                    const errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        return res.status(constants_1.RESPONSE_STATUS.BAD_REQUEST).send({
                            errors: errors.array(),
                        });
                    }
                    next();
                },
            ];
        }
        catch (err) {
            logger_1.logger.error(err);
            return [];
        }
    }
}
exports.Validator = Validator;
