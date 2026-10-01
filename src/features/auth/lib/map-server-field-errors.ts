import type { AuthActionResult } from "../types";

type ServerFieldErrors = NonNullable<
  Extract<AuthActionResult, { status: "error" }>["fieldErrors"]
>;

export function mapServerFieldErrors<Field extends keyof ServerFieldErrors>(
  fieldErrors: ServerFieldErrors | undefined,
  fields: readonly Field[],
  setFieldError: (field: Field, message: string) => void,
) {
  for (const field of fields) {
    const message = fieldErrors?.[field];
    if (message) setFieldError(field, message);
  }
}
