import { NextResponse } from "next/server";

export function middleware() {
  // Public pages do not require server-side auth refresh; the browser client
  // refreshes sessions when authenticated actions are used.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
