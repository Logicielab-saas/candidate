/**
 * NavbarWrapper - Client Component
 *
 * Conditionally renders either the authenticated user navbar or public navbar
 * based on client-side authentication status.
 */

import { NavBar } from "./Navbar";
import { PublicNavbar } from "./PublicNavbar";
import { Suspense } from "react";
import { isAuthenticated } from "@/lib/cookies";

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

export async function NavbarWrapper() {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const accessToken = Cookies.get("accessToken");
  //   const userRole = Cookies.get("userRole");
  //   setIsAuthenticated(!!(accessToken && userRole));
  // }, []);

  // // Show loading state while checking auth
  // if (isAuthenticated === null) {
  //   return <NavbarFallback />;
  // }
  const isAuthentictedUser = await isAuthenticated();

  return (
    <Suspense fallback={<NavbarFallback />}>
      {isAuthentictedUser ? <NavBar /> : <PublicNavbar />}
    </Suspense>
  );
}
