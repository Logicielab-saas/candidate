/**
 * NavbarWrapper - Server Component
 *
 * Conditionally renders either the authenticated user navbar or public navbar
 * based on the user's authentication status.
 */

import { isAuthenticated } from "@/lib/actions/auth.actions";
import { NavBar } from "./Navbar";
import { PublicNavbar } from "./PublicNavbar";
import { getDataWeb } from "@/services/static-data";
import {
  getUserLocaleOnServer,
  getUserRoleOnServer,
} from "@/lib/actions/getUserLocale.action";
import { Locale } from "@/i18n/config";
import { Suspense } from "react";

function NavbarFallback() {
  return (
    <header className="flex h-14 items-center gap-2 px-4">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="md:px-4">
          <div className="md:mx-auto md:max-w-7xl md:mt-4">
            <div className="md:rounded-xl bg-background/50 backdrop-blur-lg md:border md:shadow-sm border-b md:border-b">
              <div className="px-4 py-2 flex items-center justify-between">
                {/* Left side - Logo and Menu */}
                <div className="flex items-center gap-2">
                  <div className="md:hidden">
                    <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
                  </div>
                  <div className="h-6 w-24 bg-muted animate-pulse rounded" />
                </div>

                {/* Center - Navigation Items */}
                <div className="hidden md:flex items-center gap-3">
                  <div className="h-8 w-20 bg-muted animate-pulse rounded-full" />
                  <div className="h-8 w-20 bg-muted animate-pulse rounded-full" />
                  <div className="h-8 w-20 bg-muted animate-pulse rounded-full" />
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
                  <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
                  <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
                  <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

async function NavbarContent() {
  try {
    const [isAuth, locale, userRole] = await Promise.all([
      isAuthenticated(),
      getUserLocaleOnServer(),
      getUserRoleOnServer(),
    ]);

    const staticData = await getDataWeb({ userRole, locale: locale as Locale });

    return isAuth ? (
      <NavBar
        isNewVersion={staticData.isNewVersion}
        url={staticData.url}
        version={staticData.version}
      />
    ) : (
      <PublicNavbar
        isNewVersion={staticData.isNewVersion}
        url={staticData.url}
        version={staticData.version}
      />
    );
  } catch (error) {
    console.error("NavbarWrapper error:", error);
    // Return a minimal navbar in case of errors
    return (
      <header className="flex h-14 items-center gap-2 px-4 bg-background/50 backdrop-blur-lg border-b mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Postuly</span>
        </div>
      </header>
    );
  }
}

export async function NavbarWrapper() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}
