import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname
  
  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register']
  
  // If accessing a protected route without a token, redirect to login
  if (!token && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // If accessing login/register with a token, redirect to home page
  if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
