"use client";

import { useActionState } from "react";
import { loginWithTotp } from "@/app/actions/auth";
import { OTPForm } from "@/components/otp-form";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginWithTotp, null);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OTPForm
          action={formAction}
          isPending={isPending}
          error={state?.error}
          inputName="code"
        />
      </div>
    </div>
  );
}
