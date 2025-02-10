import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayloadType } from "@/core/types/jwt-payload.type";

// route protection configuration
const ROUTES = {
  PROTECTED: {
    ADMIN: /^\/?(admin|dashboard\/admin)/,
    RECRUITER: /^\/?(recruiter|dashboard\/recruiter)/,
    CANDIDATE: /^\/?(candidate|dashboard\/candidate)/,
  },
  RESTRICTED: {
    // * Routes that only admin can access
    ADMIN_ONLY: [
      "overview",
    ],
    RECRUITER_ONLY: [
      "users",
      "company",
      "company-settings",
      "notifications",
    ],
    CANDIDATE_ONLY: [
      "profile",
      "applications",
      "notifications",
    ],
  },
  // * default route redirection
  DEFAULT_REDIRECTS: {
    ADMIN: "/admin/dashboard",
    RECRUITER: "/recruiter/dashboard",
    CANDIDATE: "/candidate/dashboard",
  },
} as const;

const VALID_ROLES = ["admin", "recruiter", "candidate"] as const;
type ValidRole = (typeof VALID_ROLES)[number];

function isValidRole(role: string): role is ValidRole {
  return VALID_ROLES.includes(role as ValidRole);
}

function isRestrictedPath(pathname: string): boolean {
  return ROUTES.RESTRICTED.ADMIN_ONLY.some((path) => pathname.includes(path));
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only redirect if the path is exactly /admin, /recruiter, or /candidate
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL(ROUTES.DEFAULT_REDIRECTS.ADMIN, request.url));
  }
  if (pathname === '/recruiter') {
    return NextResponse.redirect(new URL(ROUTES.DEFAULT_REDIRECTS.RECRUITER, request.url));
  }
  if (pathname === '/candidate') {
    return NextResponse.redirect(new URL(ROUTES.DEFAULT_REDIRECTS.CANDIDATE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except api routes and other excluded patterns
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
