"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOCValidation = void 0;
const zod_1 = require("zod");
const createNOC = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required"
        }),
        type: zod_1.z.enum(["NOC", "GO"], {
            required_error: "Type is required"
        }),
        documentsUrl: zod_1.z.string({
            required_error: "Documents URL is required"
        })
    })
});
const updateNOC = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        type: zod_1.z.enum(["NOC", "GO"]).optional(),
        documentsUrl: zod_1.z.string().optional()
    })
});
exports.NOCValidation = {
    createNOC,
    updateNOC
};
