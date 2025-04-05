// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// Define public paths that don't require authentication
const publicPaths = ['/', '/stores', '/products', '/contact'];

export async function middleware(request: NextRequest) {
  try {
    const { isAuthenticated } = getKindeServerSession();
    const authenticated = await isAuthenticated();

    const path = request.nextUrl.pathname;

    if (publicPaths.includes(path)) {
      return NextResponse.next();
    }

    if ((path === '/cart' || path.startsWith('/dashboard')) && !authenticated) {
      return NextResponse.redirect(new URL('/api/auth/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware Error:', error);
    return NextResponse.next(); // Allow the request to proceed even if middleware fails
  }
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};