import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value

  // Define protected routes
  const protectedRoutes = ['/profile', '/chat', '/ads/create', '/success']
  // Define auth routes
  const authRoutes = ['/auth']

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // If user is authenticated and tries to access auth pages, redirect to home
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is NOT authenticated and tries to access protected pages, redirect to login
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images etc if any)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
