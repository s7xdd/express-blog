import { z } from "zod";
import { imageValidationSchema } from "../../../shared/validators/common.validators";

export const registerValidationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  bio: z.string().trim().optional().default(""),
  avatar: imageValidationSchema.optional(),
});

export const loginValidationSchema = z.object({
  username: z.string(),
  password: z.string(),
});
