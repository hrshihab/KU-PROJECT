import { z } from "zod";

const createSupport = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required"
        }),
        designation: z.string({
            required_error: "Designation is required"
        }),
        instituteOffice: z.string({
            required_error: "Institute/Office is required"
        }),
        email: z.string({
            required_error: "Email is required"
        }).email("Invalid email format"),
        buildingName: z.string().optional(),
        roomNumber: z.string().optional(),
        mobileNumber: z.string().optional(),
        problemDescription: z.string({
            required_error: "Problem description is required"
        }),
        attachmentUrl: z.string().optional(),
        category: z.enum(["IT", "ELECTRICAL", "PLUMBING", "CARPENTRY", "CLEANING", "SECURITY", "OTHER"], {
            required_error: "Category is required"
        })
    })
});

const updateSupport = z.object({
    body: z.object({
        name: z.string().optional(),
        designation: z.string().optional(),
        instituteOffice: z.string().optional(),
        email: z.string().email("Invalid email format").optional(),
        buildingName: z.string().optional(),
        roomNumber: z.string().optional(),
        mobileNumber: z.string().optional(),
        problemDescription: z.string().optional(),
        attachmentUrl: z.string().optional(),
        status: z.enum(["PENDING", "IN_PROGRESS", "RESOLVED", "REJECTED"]).optional(),
        category: z.enum(["IT", "ELECTRICAL", "PLUMBING", "CARPENTRY", "CLEANING", "SECURITY", "OTHER"]).optional()
    })
});

export const SupportValidation = {
    createSupport,
    updateSupport
}; 