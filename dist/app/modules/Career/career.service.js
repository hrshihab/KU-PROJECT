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
exports.careerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createCareer = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("data", data);
    if (!(user === null || user === void 0 ? void 0 : user.email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User email is required");
    }
    const result = yield prisma_1.default.career.create({
        data: Object.assign(Object.assign({}, data), { createdBy: user.email })
    });
    return result;
});
const getAllCareers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.career.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
});
const getCareerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.career.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Career not found");
    }
    return result;
});
const updateCareer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.career.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!exists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Career not found");
    }
    const result = yield prisma_1.default.career.update({
        where: { id },
        data: payload
    });
    return result;
});
const softDeleteCareer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.career.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!exists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Career not found");
    }
    const result = yield prisma_1.default.career.update({
        where: { id },
        data: { isDeleted: true }
    });
    return result;
});
exports.careerService = {
    createCareer,
    getAllCareers,
    getCareerById,
    updateCareer,
    softDeleteCareer
};
