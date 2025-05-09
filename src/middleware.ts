/**
 * Middleware Configuration
 *
 * Handles route protection and redirections for different user roles.
 * Ensures authenticated access to protected routes and proper role-based access.
 */

import { NextResponse, type NextRequest } from "next/server";

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/emplois",
  "/formations",
  "/companies",
  "/login",
  "/register",
  "/not-authorized",
  "/not-found",
  "/",
];

// route protection configuration
const ROUTES = {
  // PROTECTED: {
  //   ADMIN: /^\/?(admin|dashboard\/admin)/,
  //   RECRUITER: /^\/?(recruiter|dashboard\/recruiter)/,
  // },
  RESTRICTED: {
    // * Routes that require authentication and employee role
    EMPLOYEE_ONLY: ["/profile", "/settings", "/messages", "/notifications"],
  },
  // * default route redirection
  DEFAULT_REDIRECTS: {
    EMPLOYEE: "/emplois",
  },
} as const;

const VALID_ROLES = ["admin", "recruiter", "employee"] as const;
type ValidRole = (typeof VALID_ROLES)[number];

function _isValidRole(role: string): role is ValidRole {
  return VALID_ROLES.includes(role as ValidRole);
}

function isEmployeeProtectedRoute(pathname: string): boolean {
  return ROUTES.RESTRICTED.EMPLOYEE_ONLY.some(
    (route) => pathname.startsWith(route) || pathname === route
  );
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  // Allow access to public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check if trying to access employee protected routes
  if (isEmployeeProtectedRoute(pathname)) {
    // If no token or not an employee, redirect to not-authorized
    if (!token || userRole !== "employee") {
      return NextResponse.redirect(new URL("/not-authorized", request.url));
    }
  }

  // Handle admin/recruiter route redirections
  // if (pathname === "/admin") {
  //   return NextResponse.redirect(
  //     new URL(ROUTES.DEFAULT_REDIRECTS.ADMIN, request.url)
  //   );
  // }
  // if (pathname === "/recruiter") {
  //   return NextResponse.redirect(
  //     new URL(ROUTES.DEFAULT_REDIRECTS.RECRUITER, request.url)
  //   );
  // }

  if (pathname === "/recruiter/annonces/edit-annonce") {
    return NextResponse.redirect(new URL("/recruiter/annonces", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except api routes and other excluded patterns
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*))",
    "/profile/:path*",
    "/settings/:path*",
    "/messages/:path*",
    "/notifications/:path*",
  ],
};
