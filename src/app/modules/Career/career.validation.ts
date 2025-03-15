import { z } from "zod";

const createCareer = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        documentsUrl: z.string({
            required_error: "Documents URL is required"
        }),
        date: z.string({
            required_error: "Date is required"
        }).transform((str) => new Date(str))
    })
});

const updateCareer = z.object({
    body: z.object({
        title: z.string().optional(),
        documentsUrl: z.string().optional(),
        date: z.string().optional()
    })
});

export const CareerValidation = {
    createCareer,
    updateCareer
}; 