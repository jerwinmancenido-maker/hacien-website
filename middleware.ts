import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { authConfig } from "@/lib/auth/config";

const protectedPrefixes = [
  "/account",
  "/admin",
];
const localCmsPrefixes = ["/cms-preview", "/command-center", "/api/local-cms"];

function isProtectedRoute(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
}

function isLocalCmsRoute(pathname: string) {
  return localCmsPrefixes.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (isLocalCmsRoute(pathname) && process.env.CMS_PREVIEW_ENABLED !== "true") {
    return new NextResponse("Not found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  const isProtected = isProtectedRoute(pathname);
  if (!isProtected) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(authConfig.sessionCookieName)?.value);
  if (hasSession) {
    return NextResponse.next();
  }

  const loginUrl = new URL(authConfig.loginRoute, request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/cms-preview", "/command-center/:path*", "/api/local-cms/:path*"],
};
