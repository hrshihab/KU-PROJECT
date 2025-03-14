import { z } from "zod";

const createNOC = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        type: z.enum(["NOC", "GO"], {
            required_error: "Type is required"
        }),
        documentsUrl: z.string({
            required_error: "Documents URL is required"
        })
    })
});

const updateNOC = z.object({
    body: z.object({
        title: z.string().optional(),
        type: z.enum(["NOC", "GO"]).optional(),
        documentsUrl: z.string().optional()
    })
});

export const NOCValidation = {
    createNOC,
    updateNOC
}; 