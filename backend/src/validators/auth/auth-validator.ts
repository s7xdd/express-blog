import { z } from "zod";

export const registerValidationSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const loginValidationSchema = z.object({
    username: z.string(),
    password: z.string()
})