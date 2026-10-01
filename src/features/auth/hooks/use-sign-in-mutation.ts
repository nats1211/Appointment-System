"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signInAction } from "../actions";
import { mapServerFieldErrors } from "../lib/map-server-field-errors";
import type { SignInInput } from "../schemas/auth-schema";
import type { AuthActionResult } from "../types";

type SignInField = keyof SignInInput;

export function useSignInMutation(
  setFieldError: (field: SignInField, message: string) => void,
) {
  const router = useRouter();

  return useMutation<AuthActionResult, Error, SignInInput>({
    mutationFn: signInAction,
    onSuccess: (result) => {
      if (result.status === "error") {
        mapServerFieldErrors(
          result.fieldErrors,
          ["email", "password"],
          setFieldError,
        );
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    },
  });
}
