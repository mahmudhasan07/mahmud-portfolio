import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/jwt";

const getLoginUrl = (request: NextRequest) => {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);

  return loginUrl;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = await verifyAdminToken(token);

  if (pathname === "/login" && payload) {
    return NextResponse.redirect(new URL("/admin-panel", request.url));
  }

  const isAdminPage = pathname.startsWith("/admin-panel");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  if (payload?.role === "ADMIN") {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  return NextResponse.redirect(getLoginUrl(request));
}

export const config = {
  matcher: ["/login", "/admin-panel/:path*", "/api/admin/:path*"],
};
