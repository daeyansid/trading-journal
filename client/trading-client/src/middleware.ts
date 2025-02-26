import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This checks if the URL is for a protected route
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/accounts') ||
    request.nextUrl.pathname.startsWith('/trading-plan') ||
    request.nextUrl.pathname.startsWith('/daily-book') ||
    request.nextUrl.pathname.startsWith('/trade-record') ||
    request.nextUrl.pathname.startsWith('/dashboard');
  
  // Get stored auth token (if any)
  const user = request.cookies.get('user')?.value;
  
  // Allow home page to be accessed without authentication
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }
  
  // Redirect to login if trying to access protected route without auth
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Redirect to home if trying to access login/register while already logged in
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
