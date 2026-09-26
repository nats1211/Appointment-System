import z from "zod";
import { roleEnum } from "./auth-schema";
import { name, email } from "./schemaHelper";

// Owner Only
export const updatedUserRoleSchema = z.object({
  userId: z.string().min(1),
  role: roleEnum,
});

export type UpdateUserRoleInput = z.infer<typeof updatedUserRoleSchema>;

export const createUserSchema = z.object({
  name,
  email,
  role: roleEnum.default("Staff"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const userSchema = z.object({
  id: z.string(),
  name,
  email,
  emailVerified: z.boolean(),
  image: z.url().nullable(),
  role: roleEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
