"use server";

import { authenticator } from "otplib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithTotp(prevState: any, formData: FormData) {
  const code = formData.get("code") as string;
  const secret = process.env.ADMIN_SECRET;

  if (!secret) throw new Error("ADMIN_SECRET belum diset di .env");

  const isValid = authenticator.check(code, secret);

  if (isValid) {
    const oneDay = 24 * 60 * 60 * 1000;

    (await cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + oneDay),
      path: "/",
    });

    redirect("/dashboard");
  } else {
    // Return error tetap sama
    return { error: "Kode salah atau sudah kadaluarsa!" };
  }
}

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/");
}
