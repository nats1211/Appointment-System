import { z } from "zod";
import { name, email, password } from "./schemaHelper";

export const roleEnum = z.enum(["Owner", "Staff"]);

export type Role = z.infer<typeof roleEnum>;

// Auth flow schema
export const signUpSchema = z.object({
  name,
  email,
  password,
});

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email,
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

export type SignInInput = z.infer<typeof signInSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
