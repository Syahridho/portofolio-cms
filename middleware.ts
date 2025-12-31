import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Ambil cookie session
  const session = request.cookies.get("admin_session");
  const pathname = request.nextUrl.pathname;

  // SKENARIO 1: User BELUM Login, tapi memaksa masuk Dashboard
  // -> Tendang balik ke halaman Login
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // SKENARIO 2: User SUDAH Login, tapi iseng buka halaman Login
  // -> Lempar otomatis ke Dashboard (karena ngapain login lagi?)
  if (pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// PENTING: Update matcher agar middleware juga "memantau" halaman login
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
