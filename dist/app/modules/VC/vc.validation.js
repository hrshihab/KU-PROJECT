"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VCMessageValidation = void 0;
const zod_1 = require("zod");
// Zod Schema to validate the request body
const createVCMessageZodSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, "Message is required"), // Validate message is a string and non-empty
    imageUrl: zod_1.z.string().optional(), // Make imageUrl optional
});
const updateVCMessageZodSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, "Message is required").optional(), // Validate message is a string and non-empty
    imageUrl: zod_1.z.string().optional(), // Make imageUrl optional
});
exports.VCMessageValidation = {
    createVCMessageZodSchema,
    updateVCMessageZodSchema
};
