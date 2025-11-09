import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (/^\/[^/]+\.html$/.test(pathname)) return NextResponse.next();
  const m = pathname.match(/^\/(fr|en)\/([^/]+\.html)$/);
  if (m) return NextResponse.rewrite(new URL(`/${m[2]}`, req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(css|js|png|jpg|jpeg|gif|svg|ico|webp|txt|json|map)).*)"],
};