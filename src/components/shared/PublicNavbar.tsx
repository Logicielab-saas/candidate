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
import { useEffect } from "react";
import { useStaticDataStore } from "@/store/use-static-data-store";
import { fetchStaticDataAction } from "@/lib/actions/static-data.action";
import Cookies from "js-cookie";

interface PublicNavbarProps {
  isNewVersion: boolean;
  url: string;
  version: string;
}

const navItems = [
  { name: "Emplois", url: "/emplois" },
  // { name: "Formations", url: "/formations" },
  // { name: "Entreprises", url: "/companies/reviews" },
];

export function PublicNavbar({
  isNewVersion,
  url,
  version,
}: PublicNavbarProps) {
  const pathname = usePathname();
  const { setStaticData } = useStaticDataStore();

  useEffect(() => {
    const initializeStaticData = async () => {
      try {
        // Always fetch cached data first
        const cachedData = await fetchStaticDataAction(url);
        setStaticData(cachedData);

        // Check version and update cache if needed
        const storedVersion = Cookies.get("versionwebjs");

        if (!storedVersion || storedVersion !== version) {
          Cookies.set("versionwebjs", version, { expires: 365 });

          if (isNewVersion) {
            // This will update the cache for future requests
            const freshData = await fetchStaticDataAction(url);
            setStaticData(freshData);
          }
        }
      } catch (error) {
        console.error("PublicNavbar: Failed to initialize static data:", error);
      }
    };

    initializeStaticData();
  }, [isNewVersion, setStaticData, url, version]);

  const activeTab =
    navItems.find(
      (item) => pathname === item.url || (item.url === "/" && pathname === "/")
    )?.name || "";

  const isEmplois = pathname.includes("/emplois");

  return (
    <header className={cn("flex h-14 items-center gap-2 px-4")}>
      <div
        className={`${
          isEmplois ? "absolute" : "fixed"
        } top-0 left-0 right-0 z-50`}
      >
        <div className="md:px-4">
          <div className="md:mx-auto md:max-w-7xl md:mt-4">
            <div className="md:rounded-xl bg-background/50 backdrop-blur-lg md:border md:shadow-sm border-b md:border-b">
              <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Mobile Menu Button */}
                  <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle className="text-primary">
                          Postuly
                        </SheetTitle>
                        <SheetDescription>
                          Découvrez votre prochain emploi
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
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">
                      Postuly
                    </span>
                  </Link>
                </div>

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

                {/* Right Side */}
                <div className="flex items-center gap-2">
                  <ThemeButton />
                  <LanguageSwitcher />

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="inline-flex"
                      asChild
                    >
                      <Link href="/login">Se connecter</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/signup">S&apos;inscrire</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
