"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignUpMutation } from "../hooks/use-sign-up-mutation";
import { signUpSchema, type SignUpInput } from "../schemas/auth-schema";

export function SignUpForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const signUpMutation = useSignUpMutation((field, message) =>
    form.setError(field, { type: "server", message }),
  );

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit((values) =>
            signUpMutation.mutate(values),
          )}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                {...form.register("name")}
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                required
                aria-invalid={Boolean(form.formState.errors.name)}
                aria-describedby={
                  form.formState.errors.name ? "name-error" : undefined
                }
              />
              {form.formState.errors.name && (
                <p id="name-error" className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                {...form.register("email")}
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
                aria-invalid={Boolean(form.formState.errors.email)}
                aria-describedby={
                  form.formState.errors.email ? "email-error" : undefined
                }
              />
              {form.formState.errors.email && (
                <p id="email-error" className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                {...form.register("password")}
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                aria-invalid={Boolean(form.formState.errors.password)}
                aria-describedby={
                  form.formState.errors.password ? "password-error" : undefined
                }
              />
              {form.formState.errors.password && (
                <p id="password-error" className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                {...form.register("confirmPassword")}
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                aria-invalid={Boolean(form.formState.errors.confirmPassword)}
                aria-describedby={
                  form.formState.errors.confirmPassword
                    ? "confirm-password-error"
                    : undefined
                }
              />
              {form.formState.errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  className="text-sm text-destructive"
                >
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                {signUpMutation.data && (
                  <p
                    role={
                      signUpMutation.data.status === "error"
                        ? "alert"
                        : "status"
                    }
                    className={
                      signUpMutation.data.status === "error"
                        ? "text-sm text-destructive"
                        : "text-sm text-foreground"
                    }
                    aria-live="polite"
                  >
                    {signUpMutation.data.message}
                  </p>
                )}
                {signUpMutation.isError && (
                  <p role="alert" className="text-sm text-destructive">
                    Unable to create your account. Please try again.
                  </p>
                )}
                <Button type="submit" disabled={signUpMutation.isPending}>
                  {signUpMutation.isPending
                    ? "Creating account..."
                    : "Create account"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
