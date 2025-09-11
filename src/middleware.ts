import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user has auth cookie/session
  const hasAuth = request.cookies.has('sb-access-token') || 
                  request.cookies.has('supabase-auth-token') ||
                  request.cookies.has('sb-localhost-auth-token');
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password', '/api'];
  
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // If accessing root without auth, redirect to login
  if (pathname === '/' && !hasAuth && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // If accessing protected routes without auth, redirect to login
  if (!hasAuth && !isPublicRoute && pathname !== '/') {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};