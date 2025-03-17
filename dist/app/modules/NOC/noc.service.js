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
exports.nocService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createNOC = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(user === null || user === void 0 ? void 0 : user.email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User email is required");
    }
    const result = yield prisma_1.default.nOC.create({
        data: Object.assign(Object.assign({}, data), { createdBy: user.email })
    });
    return result;
});
const getAllNOCs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.nOC.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
});
const getNOCById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.nOC.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "NOC not found");
    }
    return result;
});
const updateNOC = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.nOC.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!exists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "NOC not found");
    }
    const result = yield prisma_1.default.nOC.update({
        where: { id },
        data: payload
    });
    return result;
});
const softDeleteNOC = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.nOC.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!exists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "NOC not found");
    }
    const result = yield prisma_1.default.nOC.update({
        where: { id },
        data: { isDeleted: true }
    });
    return result;
});
exports.nocService = {
    createNOC,
    getAllNOCs,
    getNOCById,
    updateNOC,
    softDeleteNOC
};
