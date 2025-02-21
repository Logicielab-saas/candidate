import { NextResponse, type NextRequest } from "next/server";
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
    ADMIN: "/admin/annonces",
    RECRUITER: "/recruiter/annonces",
    CANDIDATE: "/candidate/annonces",
  },
} as const;

const VALID_ROLES = ["admin", "recruiter", "candidate"] as const;
type ValidRole = (typeof VALID_ROLES)[number];

function _isValidRole(role: string): role is ValidRole {
  return VALID_ROLES.includes(role as ValidRole);
}

function _isRestrictedPath(pathname: string): boolean {
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

  if (pathname === "/recruiter/annonces/edit-annonce") {
    return NextResponse.redirect(new URL("/recruiter/annonces", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except api routes and other excluded patterns
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
