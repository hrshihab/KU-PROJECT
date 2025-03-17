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
exports.newsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const news_constant_1 = require("./news.constant");
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const createNews = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(user === null || user === void 0 ? void 0 : user.email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User email is required");
    }
    const result = yield prisma_1.default.news.create({
        data: Object.assign(Object.assign({}, data), { createdBy: user.email })
    });
    return result;
});
const getAllNews = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: news_constant_1.newsSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.news.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });
    const total = yield prisma_1.default.news.count({
        where: whereConditions
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getNewsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.news.findUnique({
        where: { id }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "News not found");
    }
    return result;
});
const updateNews = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("payload", payload);
    const exists = yield prisma_1.default.news.findUnique({
        where: { id }
    });
    if (!exists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "News not found");
    }
    console.log("exists", exists);
    const result = yield prisma_1.default.news.update({
        where: { id },
        data: payload
    });
    return result;
});
const deleteNews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.news.findUnique({
        where: { id }
    });
    if (!exists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "News not found");
    }
    const result = yield prisma_1.default.news.delete({
        where: { id }
    });
    return result;
});
exports.newsService = {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews
};
