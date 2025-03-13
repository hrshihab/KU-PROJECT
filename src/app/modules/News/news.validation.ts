import { z } from "zod";

const createNews = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        description: z.string({
            required_error: "Description is required"
        }),
        image: z.string({
            required_error: "Image is required"
        }),
    })
})

const updateNewsZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional()
    })
});

export const NewsValidation = {
    createNews,
    updateNewsZodSchema
}
