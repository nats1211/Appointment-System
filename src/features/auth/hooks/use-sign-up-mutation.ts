"use client";

import { useMutation } from "@tanstack/react-query";

import { signUpAction } from "../actions";
import { mapServerFieldErrors } from "../lib/map-server-field-errors";
import type { SignUpInput } from "../schemas/auth-schema";
import type { AuthActionResult } from "../types";

type SignUpField = keyof SignUpInput;

export function useSignUpMutation(
  setFieldError: (field: SignUpField, message: string) => void,
) {
  return useMutation<AuthActionResult, Error, SignUpInput>({
    mutationFn: signUpAction,
    onSuccess: (result) => {
      if (result.status === "error") {
        mapServerFieldErrors(
          result.fieldErrors,
          ["name", "email", "password", "confirmPassword"],
          setFieldError,
        );
      }
    },
  });
}
