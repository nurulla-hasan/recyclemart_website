import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next.js 16 কনভেনশন অনুযায়ী ফাংশনের নাম proxy হবে
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  // i18n middleware handles the locale prefixing
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  // To check auth correctly with locales, we can strip the locale prefix
  // locales: ['en', 'bn']
  const pathWithoutLocale = pathname.replace(/^\/(en|bn)/, '') || '/';

  // Define protected routes (relative to root, no locale)
  const protectedRoutes = ['/profile', '/chat', '/ads/create', '/success', '/lottery'];
  // Define auth routes
  const authRoutes = ['/auth'];

  const isProtectedRoute = protectedRoutes.some(route => pathWithoutLocale.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathWithoutLocale.startsWith(route));

  // Get current locale for redirects
  const locale = pathname.split('/')[1];
  const currentLocale = ['en', 'bn'].includes(locale) ? locale : 'en';

  // If user is authenticated and tries to access auth pages, redirect to home
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
  }

  // If user is NOT authenticated and tries to access protected pages, redirect to login
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL(`/${currentLocale}/auth/login`, request.url));
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - /_next (Next.js internals)
  // - /static (static files)
  // - all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
