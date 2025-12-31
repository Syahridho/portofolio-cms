"use client";

import { useActionState } from "react";
import { loginWithTotp } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginWithTotp, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg border bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Admin Login
        </h1>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Google Authenticator Code
            </label>
            <input
              type="text"
              name="code"
              placeholder="123456"
              maxLength={6}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-center text-2xl tracking-widest outline-none focus:border-black focus:ring-1 focus:ring-black"
              autoFocus
              required
            />
          </div>

          {state?.error && (
            <p className="text-center text-sm text-red-500">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isPending ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
