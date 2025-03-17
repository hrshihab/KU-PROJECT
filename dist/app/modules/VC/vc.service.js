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
exports.VCMessageService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createVCMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the message is provided in the request body
    //console.log("data", data);
    if (!data.message || !data.imageUrl) {
        throw new Error("Message and imageUrl content is required");
    }
    // Create the VC Message in the database
    const result = yield prisma_1.default.vCMessage.create({
        data: {
            message: data.message,
            imageUrl: data.imageUrl, // Image URL from Cloudinary (if available)
        },
    });
    return result; // Return the created VC Message
});
const getVCMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.vCMessage.findMany();
    return result;
});
const updateVCMessage = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.vCMessage.update({
        where: { id },
        data: data
    });
    return result;
});
exports.VCMessageService = {
    createVCMessage,
    getVCMessage,
    updateVCMessage
};
