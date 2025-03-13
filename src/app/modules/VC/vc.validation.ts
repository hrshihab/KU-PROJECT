import { z } from "zod";

// Zod Schema to validate the request body
const createVCMessageZodSchema = z.object({
  message: z.string().min(1, "Message is required"),  // Validate message is a string and non-empty
  imageUrl: z.string().optional(), // Make imageUrl optional
});

const updateVCMessageZodSchema = z.object({
  message: z.string().min(1, "Message is required").optional(),  // Validate message is a string and non-empty
  imageUrl: z.string().optional(), // Make imageUrl optional
});

export const VCMessageValidation = {
  createVCMessageZodSchema,
  updateVCMessageZodSchema
};

