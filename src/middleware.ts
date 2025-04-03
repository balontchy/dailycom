// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// Define public paths that don't require authentication
const publicPaths = ['/', '/stores', '/products', '/contact'];

export async function middleware(request: NextRequest) {
  // Get Kinde session
  const { isAuthenticated } = getKindeServerSession();
  
  // Check if the user is authenticated
  const authenticated = await isAuthenticated();
  
  // Get the path from the request URL
  const path = request.nextUrl.pathname;
  
  // Allow access to public paths without authentication
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }
  
  // Block access to dashboard and cart routes if not authenticated
  if ((path === '/cart' || path.startsWith('/dashboard')) && !authenticated) {
    // Redirect to login
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }
  
  // Continue for all other cases
  return NextResponse.next();
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};