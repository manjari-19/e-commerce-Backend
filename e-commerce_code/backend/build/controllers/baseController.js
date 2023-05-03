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
var respHndlr = require("../middleware/responseHandler");
var constant = require('../../middlewares/resp-handler/constants');
class BaseController {
    constructor({ service, model, models, logger }) {
        this.service = service;
        this.model = model;
        this.logger = logger;
        this.models = models;
    }
    readAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.readAll(req);
                respHndlr.sendSuccess(res, data, constant.RESPONSE_STATUS.SUCCESS);
            }
            catch (error) {
                respHndlr.sendError(res, error);
            }
        });
    }
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.readOne(req);
                respHndlr.sendSuccess(res, data, constant.RESPONSE_STATUS.SUCCESS);
            }
            catch (error) {
                respHndlr.sendError(res, error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.create(req);
                respHndlr.sendSuccess(res, data);
            }
            catch (error) {
                respHndlr.sendError(res, error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.update(req);
                respHndlr.sendSuccess(res, data, constant.RESPONSE_STATUS.SUCCESS);
            }
            catch (error) {
                respHndlr.sendError(res, error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.delete(req);
                respHndlr.sendSuccess(res, data), constant.RESPONSE_STATUS.SUCCESS;
            }
            catch (error) {
                respHndlr.sendError(res, error);
            }
        });
    }
}
exports.default = BaseController;
