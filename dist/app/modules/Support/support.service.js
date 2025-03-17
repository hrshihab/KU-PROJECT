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
exports.supportService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createSupport = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.support.create({
        data: Object.assign(Object.assign({}, data), { status: "PENDING" })
    });
    return result;
});
const getAllSupports = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.support.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
});
const getSupportById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.support.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Support request not found");
    }
    return result;
});
const updateSupport = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.support.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!exists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Support request not found");
    }
    const result = yield prisma_1.default.support.update({
        where: { id },
        data: payload
    });
    return result;
});
const softDeleteSupport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.support.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!exists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Support request not found");
    }
    const result = yield prisma_1.default.support.update({
        where: { id },
        data: { isDeleted: true }
    });
    return result;
});
exports.supportService = {
    createSupport,
    getAllSupports,
    getSupportById,
    updateSupport,
    softDeleteSupport
};
