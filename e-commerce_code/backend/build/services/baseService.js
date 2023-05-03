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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exception_1 = __importDefault(require("../exceptions/exception"));
const constant = require('../../middlewares/resp-handler/constants');
const db_1 = __importDefault(require("../config/db"));
const pagination_1 = require("../utils/pagination");
class BaseService {
    constructor({ model, models, logger }) {
        this.model = model;
        this.models = models;
        this.logger = logger;
    }
    readAll(req = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let order = req.query.sortOrder || "DESC";
                let query = (0, pagination_1.paginator)(req.query, []);
                // Destructure filter parameters from request using rest operator 
                let _a = req.query, { sortOrder, sortBy, limit, page } = _a, filterparams = __rest(_a, ["sortOrder", "sortBy", "limit", "page"]);
                let whereCond = {};
                whereCond = Object.keys(filterparams).length ? filterparams : {};
                return yield this.model.findAndCountAll({
                    limit: query.limit,
                    offset: query.offset,
                    order: [[req.query.sortBy || "createdAt", order || "DESC"]],
                    where: Object.assign({}, whereCond)
                });
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    readOne(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var id = req.params.id;
                var result = yield this.model.findByPk(id);
                if (!result) {
                    throw new exception_1.default(constant.ERROR_TYPE.BAD_REQUEST, `record with id ${id} does not exist`);
                }
                return Promise.resolve(result);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const _transaction = yield db_1.default.transaction();
            try {
                let data = yield this.model.create(req.body, { transaction: _transaction });
                yield _transaction.commit();
                return Promise.resolve(data);
            }
            catch (error) {
                yield _transaction.rollback();
                return Promise.reject(error);
            }
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const _transaction = yield db_1.default.transaction();
            try {
                var id = req.params.id;
                var result = yield this.model.findByPk(id, { transaction: _transaction });
                if (!result) {
                    throw new exception_1.default(constant.ERROR_TYPE.BAD_REQUEST, `record with id ${id} does not exist`);
                }
                let data = yield this.model.update(req.body, {
                    where: { id: id }, returning: true, plain: true,
                    transaction: _transaction
                });
                yield _transaction.commit();
                return Promise.resolve(data);
            }
            catch (error) {
                yield _transaction.rollback();
                return Promise.reject(error);
            }
        });
    }
    delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const _transaction = yield db_1.default.transaction();
            try {
                var id = req.params.id;
                var result = yield this.model.findByPk(id, { transaction: _transaction });
                if (!result) {
                    throw new exception_1.default(constant.ERROR_TYPE.BAD_REQUEST, `record does not exist`);
                }
                yield this.model.destroy({ where: { id }, _transaction });
                yield _transaction.commit();
                return Promise.resolve(`record deleted successfully of id ${id}`);
            }
            catch (error) {
                yield _transaction.rollback();
                return Promise.reject(error);
            }
        });
    }
}
exports.default = BaseService;
