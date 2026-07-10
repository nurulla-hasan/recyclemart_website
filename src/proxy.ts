import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/profile',
  '/chat',
  '/ads/create',
  '/success',
  '/lottery',
  '/my-orders',
  '/checkout',
];

const isRouteMatch = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

const getLocale = (pathname: string) => {
  const locale = pathname.split('/')[1];
  return ['en', 'bn'].includes(locale) ? locale : 'en';
};

// Next.js 16 convention requires the function name to be proxy.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const pathWithoutLocale = pathname.replace(/^\/(en|bn)/, '') || '/';
  const isProtectedRoute = protectedRoutes.some((route) =>
    isRouteMatch(pathWithoutLocale, route),
  );
  const isAuthRoute = isRouteMatch(pathWithoutLocale, '/auth');
  const currentLocale = getLocale(pathname);

  // A missing access token means the user is logged out. Block the request
  // before rendering any private route and preserve the intended destination.
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL(`/${currentLocale}/auth/login`, request.url);
    loginUrl.searchParams.set('redirectPath', pathWithoutLocale);
    return NextResponse.redirect(loginUrl);
  }

  // If an authenticated user tries to access auth pages, redirect to home.
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
  }

  return createMiddleware(routing)(request);
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /static (static files)
  // - all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
