import z from "zod";

export const email = z
  .email("Enter a valid email address")
  .toLowerCase()
  .trim();
export const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be at most 72 characters");
export const name = z.string().min(1, "Name is required").max(100);
