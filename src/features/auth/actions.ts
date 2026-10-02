"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "./schemas/auth-schema";
import {
  createAuthErrorResult,
  createValidationErrorResult,
  type AuthActionResult,
} from "./types";

export async function signUpAction(input: unknown): Promise<AuthActionResult> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    return createValidationErrorResult(parsed.error.issues);
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
        callbackURL: "/login?verified=1",
      },
      headers: await headers(),
    });
    return {
      status: "success",
      message: "Account created. Check your email to verify your address.",
    };
  } catch (error) {
    console.error(
      "Sign-up failed",
      error instanceof Error ? error.message : error,
    );
    return createAuthErrorResult(
      "Unable to create your account with those details. You can try signing in if you already have an account.",
    );
  }
}

export async function signInAction(input: unknown): Promise<AuthActionResult> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return createValidationErrorResult(parsed.error.issues);
  }

  try {
    await auth.api.signInEmail({
      body: parsed.data,
      headers: await headers(),
    });
    return { status: "success", message: "" };
  } catch (error) {
    console.error(
      "Sign-in failed",
      error instanceof Error ? error.message : error,
    );
    return createAuthErrorResult(
      "Unable to sign in. Check your email and password, then try again.",
    );
  }
}

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}
