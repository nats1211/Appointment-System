"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { useSignInMutation } from "../hooks/use-sign-in-mutation";
import { signInSchema, type SignInInput } from "../schemas/auth-schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const signInMutation = useSignInMutation((field, message) =>
    form.setError(field, { type: "server", message }),
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in with your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit((values) =>
              signInMutation.mutate(values),
            )}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  {...form.register("email")}
                  type="email"
                  placeholder="tanford@example.com"
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
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  {...form.register("password")}
                  type="password"
                  autoComplete="current-password"
                  required
                  aria-invalid={Boolean(form.formState.errors.password)}
                  aria-describedby={
                    form.formState.errors.password
                      ? "password-error"
                      : undefined
                  }
                />
                {form.formState.errors.password && (
                  <p id="password-error" className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </Field>
              <Field>
                {signInMutation.data?.status === "error" && (
                  <p
                    role="alert"
                    className="text-sm text-destructive"
                    aria-live="polite"
                  >
                    {signInMutation.data.message}
                  </p>
                )}
                {signInMutation.isError && (
                  <p role="alert" className="text-sm text-destructive">
                    Unable to sign in. Please try again.
                  </p>
                )}
                <Button type="submit" disabled={signInMutation.isPending}>
                  {signInMutation.isPending ? "Signing in..." : "Sign in"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
