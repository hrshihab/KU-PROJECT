"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportValidation = void 0;
const zod_1 = require("zod");
const createSupport = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required"
        }),
        designation: zod_1.z.string({
            required_error: "Designation is required"
        }),
        instituteOffice: zod_1.z.string({
            required_error: "Institute/Office is required"
        }),
        email: zod_1.z.string({
            required_error: "Email is required"
        }).email("Invalid email format"),
        buildingName: zod_1.z.string().optional(),
        roomNumber: zod_1.z.string().optional(),
        mobileNumber: zod_1.z.string().optional(),
        problemDescription: zod_1.z.string({
            required_error: "Problem description is required"
        }),
        attachmentUrl: zod_1.z.string().optional(),
        category: zod_1.z.enum(["IT", "ELECTRICAL", "PLUMBING", "CARPENTRY", "CLEANING", "SECURITY", "OTHER"], {
            required_error: "Category is required"
        })
    })
});
const updateSupport = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        instituteOffice: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email format").optional(),
        buildingName: zod_1.z.string().optional(),
        roomNumber: zod_1.z.string().optional(),
        mobileNumber: zod_1.z.string().optional(),
        problemDescription: zod_1.z.string().optional(),
        attachmentUrl: zod_1.z.string().optional(),
        status: zod_1.z.enum(["PENDING", "IN_PROGRESS", "RESOLVED", "REJECTED"]).optional(),
        category: zod_1.z.enum(["IT", "ELECTRICAL", "PLUMBING", "CARPENTRY", "CLEANING", "SECURITY", "OTHER"]).optional()
    })
});
exports.SupportValidation = {
    createSupport,
    updateSupport
};
