import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STATIC_EXT = [".css",".js",".png",".jpg",".jpeg",".gif",".svg",".ico",".webp",".txt",".json",".map"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/favicon.ico" || STATIC_EXT.some(ext => pathname.endsWith(ext))) return NextResponse.next();
  if (/^\/[^/]+\.html$/.test(pathname)) return NextResponse.next();
  const m = pathname.match(/^\/(fr|en)\/([^/]+\.html)$/);
  if (m) return NextResponse.rewrite(new URL(`/${m[2]}`, req.url));
  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };