import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, deriveSessionToken } from "@/lib/adminAuth";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!cookie || !expectedPassword) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    const expectedToken = await deriveSessionToken(expectedPassword);
    if (cookie !== expectedToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
