import { z } from "zod";

export const loginValidationSchema = z.object({
    username: z.string(),
    password: z.string()
})