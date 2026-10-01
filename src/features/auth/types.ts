export type AuthActionResult =
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<AuthFieldName, string>>;
    }
  | { status: "success"; message: string };

type AuthFieldName = "name" | "email" | "password" | "confirmPassword";

export function createAuthErrorResult(message: string): AuthActionResult {
  return { status: "error", message };
}

export function createValidationErrorResult(
  issues: { path: PropertyKey[]; message: string }[],
): AuthActionResult {
  const fieldErrors: NonNullable<
    Extract<AuthActionResult, { status: "error" }>["fieldErrors"]
  > = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (
      (field === "name" ||
        field === "email" ||
        field === "password" ||
        field === "confirmPassword") &&
      !fieldErrors[field]
    ) {
      fieldErrors[field] = issue.message;
    }
  }

  return {
    status: "error",
    message: "Please correct the highlighted fields.",
    fieldErrors,
  };
}
