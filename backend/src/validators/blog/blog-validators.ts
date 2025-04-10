import { z } from "zod";
import { imageValidationSchema } from "../common.validators";


export const createBlogValidationSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    categories: z.array(z.string().trim()).optional(),
    tags: z.array(z.string().trim()).optional(),
    thumbnail: imageValidationSchema.optional(),
    is_published: z.boolean().optional().default(true),
});
