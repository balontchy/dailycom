import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function middleware(req: Request) {
    // req is currently unused, but you can add logic here if needed
  },
  {
    // Middleware still runs on all routes, but doesn't protect the blog route
    publicPaths: ["/"],
  }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/api/:path*',
    '/dashbaord/:path*'
  ],
}