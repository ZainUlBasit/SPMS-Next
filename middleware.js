import { NextResponse } from "next/server";

// Pass-through middleware.
// IMPORTANT: we exclude Next.js internal/static assets; otherwise chunk loading can break.
export function middleware(_request) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all paths except Next.js internals and common static assets.
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
