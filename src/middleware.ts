import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user has auth cookie/session
  const hasAuth = request.cookies.has('sb-access-token') || 
                  request.cookies.has('supabase-auth-token') ||
                  request.cookies.has('sb-localhost-auth-token') ||
                  request.cookies.has('guest-mode'); // Allow guest mode
  
  // Public routes that everyone can access (homepage, login, register, etc)
  const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/api'];
  
  // Protected routes that need authentication
  const protectedRoutes = ['/profile'];
  
  // Admin-only routes
  const adminRoutes = ['/admin'];
  
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  // Development mode logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚧 Development mode: Accessing ${pathname} ${hasAuth ? 'with auth' : 'without auth'}`);
  }
  
  // Only protect /profile and /admin routes - homepage is now public for all
  if (isProtectedRoute && !hasAuth) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Admin routes need special handling (will be done server-side)
  if (isAdminRoute && !hasAuth) {
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