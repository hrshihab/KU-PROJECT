"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareerValidation = void 0;
const zod_1 = require("zod");
const createCareer = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required"
        }),
        documentsUrl: zod_1.z.string({
            required_error: "Documents URL is required"
        }),
        date: zod_1.z.string({
            required_error: "Date is required"
        }).transform((str) => new Date(str))
    })
});
const updateCareer = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        documentsUrl: zod_1.z.string().optional(),
        date: zod_1.z.string().optional()
    })
});
exports.CareerValidation = {
    createCareer,
    updateCareer
};
