// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['fr', 'en']
const defaultLocale = 'fr'

// 1. Détecte la langue dans le chemin (si non présente) et redirige
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Vérifie si le chemin commence par une locale supportée
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // 2. Si aucune locale n'est présente, rediriger vers la locale par défaut
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Ignore les chemins API, les assets, les fichiers statiques, et /admin
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|admin).*)'],
}