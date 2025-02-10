import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayloadType } from "@/core/types/jwt-payload.type";

// route protection configuration
const ROUTES = {
  PROTECTED: {
    ADMIN: /^\/?(admin|dashboard\/admin)/,
    AGENT: /^\/?(agent|dashboard\/agent)/,
  },
  RESTRICTED: {
    // * Routes that only admin can access
    ADMIN_ONLY: [
      "overview",
    ],
  },
  // * default route redirection
  DEFAULT_REDIRECTS: {
    ADMIN: "/gestion",
    AGENT: "/gestion",
  },
} as const;

const VALID_ROLES = ["admin", "agent"] as const;
type ValidRole = (typeof VALID_ROLES)[number];

function isValidRole(role: string): role is ValidRole {
  return VALID_ROLES.includes(role as ValidRole);
}

function isRestrictedPath(pathname: string): boolean {
  return ROUTES.RESTRICTED.ADMIN_ONLY.some((path) => pathname.includes(path));
}

function isJWTPayloadType(payload: any): payload is JWTPayloadType {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof payload.sub === "number" &&
    typeof payload.email === "string" &&
    typeof payload.role === "string"
  );
}

export default function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;
  const pathnameSegments = pathname.split("/");
  const potentialRole = pathnameSegments[1];

  // Prevent logged in users from accessing login page
  if (pathname.includes("/login") && accessToken) {
    try {
      const decoded = jwt.decode(accessToken);
      if (!decoded || !isJWTPayloadType(decoded)) {
        throw new Error("Invalid token payload");
      }
      const role = decoded.role.toLowerCase();
      const redirectPath = `/${role}${ROUTES.DEFAULT_REDIRECTS[role === "admin" ? "ADMIN" : "AGENT"]}`;
      return NextResponse.redirect(new URL(redirectPath, request.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Handle role-based root redirects
  if (potentialRole && isValidRole(potentialRole)) {
    if (pathname === `/${potentialRole}`) {
      const redirectPath = `/${potentialRole}${potentialRole === "admin"
        ? ROUTES.DEFAULT_REDIRECTS.ADMIN
        : ROUTES.DEFAULT_REDIRECTS.AGENT
        }`;
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  // Handle protected and restricted routes
  if (
    pathname.match(ROUTES.PROTECTED.ADMIN) ||
    pathname.match(ROUTES.PROTECTED.AGENT)
  ) {
    // No token → redirect to login
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify and decode the token
      const decoded = jwt.decode(accessToken);
      if (!decoded || !isJWTPayloadType(decoded)) {
        throw new Error("Invalid token payload");
      }

      // Wrong role for admin routes → unauthorized
      if (
        pathname.match(ROUTES.PROTECTED.ADMIN) &&
        decoded.role !== "ADMIN"
      ) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // Wrong role for agent routes → unauthorized
      if (
        pathname.match(ROUTES.PROTECTED.AGENT) &&
        decoded.role !== "AGENT"
      ) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // Agent trying to access admin-only pages → unauthorized
      if (decoded.role === "AGENT" && isRestrictedPath(pathname)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except api routes and other excluded patterns
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
