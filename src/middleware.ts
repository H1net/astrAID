import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { isAdmin } from "./lib/auth";

export default withAuth(
  // Augment the request
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;
    
    // Protect admin routes - only allow users with ADMIN role
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // Allow access to all other routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes to apply this middleware to
export const config = {
  matcher: ["/admin/:path*"],
};
