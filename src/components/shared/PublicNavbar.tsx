/**
 * PublicNavbar - Client Component
 *
 * Navigation component for unauthenticated users with dynamic data loading
 * and state management.
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeButton } from "@/components/shared/ThemeButton";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useEffect, useState } from "react";
import { useStaticDataStore } from "@/store/use-static-data-store";
import { fetchStaticDataAction } from "@/lib/actions/static-data.action";
import Cookies from "js-cookie";
import { useDataWebJson } from "@/hooks/use-data-web-json";
import { useLocale } from "next-intl";

const navItems = [
  { name: "Emplois", url: "/emplois" },
  // { name: "Formations", url: "/formations" },
  // { name: "Entreprises", url: "/companies/reviews" },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const { setStaticData } = useStaticDataStore();
  const [isLoaded, setIsLoaded] = useState(false);

  // Get user data from cookies
  const userRole = "public";
  const locale = useLocale();

  // Fetch static data
  const { data, isLoading } = useDataWebJson(userRole, locale);

  console.log(data);

  useEffect(() => {
    const initializeData = async () => {
      try {
        if (isLoading) return;
        const storedVersion = Cookies.get("versionwebjs");
        const currentVersion = data.version;
        const isNewVersion = !storedVersion || storedVersion !== currentVersion;

        // Always fetch cached data first
        const cachedData = await fetchStaticDataAction(data.url);
        setStaticData(cachedData);

        if (isNewVersion) {
          Cookies.set("versionwebjs", currentVersion, { expires: 365 });
          // This will update the cache for future requests
          const freshData = await fetchStaticDataAction(data.url);
          setStaticData(freshData);
        }

        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to initialize data:", error);
        // Handle error appropriately
      }
    };

    initializeData();
  }, [setStaticData, data, isLoading]);

  const activeTab =
    navItems.find(
      (item) => pathname === item.url || (item.url === "/" && pathname === "/")
    )?.name || "";

  const isEmplois = pathname.includes("/emplois");

  if (!isLoaded) {
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

  return (
    <header
      className={cn(
        "flex h-14 items-center gap-2 px-4",
        isEmplois ? "absolute" : "fixed"
      )}
    >
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="md:px-4">
          <div className="md:mx-auto md:max-w-7xl md:mt-4">
            <div className="md:rounded-xl bg-background/50 backdrop-blur-lg md:border md:shadow-sm border-b md:border-b">
              <div className="px-4 py-2 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <Sheet>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle className="text-primaryHex-500">
                        Postuly
                      </SheetTitle>
                      <SheetDescription>
                        Trouvez votre prochain emploi
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {navItems.map((item) => {
                        const isActive = activeTab === item.name;
                        return (
                          <Link
                            key={item.name}
                            href={item.url}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-foreground/60 hover:bg-muted"
                            )}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Logo */}
                <Link href="/emplois" className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">
                    Postuly
                  </span>
                </Link>

                {/* Center Navigation */}
                <div className="hidden md:flex items-center gap-3">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.name;
                    return (
                      <Link
                        key={item.name}
                        href={item.url}
                        className={cn(
                          "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                          "text-foreground/80 hover:text-primary",
                          isActive && "bg-muted text-primary"
                        )}
                      >
                        {item.name}
                        {isActive && (
                          <motion.div
                            layoutId="lamp"
                            className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center gap-2">
                  <ThemeButton />
                  <LanguageSwitcher />
                  <Button size="sm" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/signup">S&apos;inscrire</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
