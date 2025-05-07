"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Home,
  User,
  MessageSquare,
  Bell,
  LogOut,
  Settings,
  Star,
  HelpCircle,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeButton } from "@/components/shared/ThemeButton";
import { usePathname, useRouter } from "next/navigation";
import { useProfile } from "@/features/candidature/(profile)/hooks/use-profile";
import { Skeleton } from "../ui/skeleton";
import { requestPermission } from "@/lib/request-permission";
import { useEffect, useState } from "react";
import { logout } from "@/features/auth/services/logout";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

// interface NavItem {
//   name: string;
//   url: string;
//   icon: LucideIcon;
// }

// interface NavBarProps {
//   items: NavItem[];
//   className?: string;
// }

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: profile, isLoading } = useProfile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  const navItems = [
    { name: t("jobs"), url: "/emplois", icon: Home },
    { name: t("formations"), url: "/formations", icon: User },
    { name: t("profile"), url: "/profile", icon: Briefcase },
    {
      name: t("companies"),
      url: "/companies/reviews",
      icon: Star,
    },
  ];

  useEffect(() => {
    // Only request permission if we're in a browser environment
    if (typeof window !== "undefined") {
      requestPermission().catch((error: Error) => {
        console.error("Failed to setup notifications:", error);
      });
    }
  }, []);

  const activeTab =
    navItems.find(
      (item) => pathname === item.url || (item.url === "/" && pathname === "/")
    )?.name || "";

  const isNotFixed =
    pathname.includes("/emplois") || pathname.includes("/formations/watch");

  // Generate user initials for avatar fallback
  const userInitials = profile
    ? [profile.first_name, profile.last_name]
        .filter(Boolean)
        .map((n) => n?.[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className={cn("flex h-14 items-center gap-2 px-4")}>
      <div
        className={` ${
          isNotFixed ? "absolute" : "fixed"
        }  top-0 left-0 right-0  z-50`}
      >
        <div className="md:px-4">
          <div className="md:mx-auto md:max-w-7xl md:mt-4">
            <div className="md:rounded-xl bg-background/50 backdrop-blur-lg md:border md:shadow-sm border-b md:border-b">
              <div className="px-4 py-2 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle className="text-primaryHex-500">
                        {t("title")}
                      </SheetTitle>
                      <SheetDescription>{t("description")}</SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.name;
                        return (
                          <Link
                            key={item.name}
                            href={item.url}
                            onClick={() => setIsSheetOpen(false)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-foreground/60 hover:bg-muted"
                            )}
                          >
                            <Icon className="h-5 w-5" />
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
                    {t("title")}
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
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/messages">
                      <MessageSquare className="h-5 w-5 " />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    asChild
                  >
                    <Link href="/notifications">
                      <Bell className="h-5 w-5" />
                    </Link>
                  </Button>

                  <ThemeButton />
                  <LanguageSwitcher />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full hover:cursor-pointer"
                      >
                        {isLoading ? (
                          <Avatar className="h-10 w-10 border">
                            <AvatarFallback className="bg-muted/50 p-0">
                              <Skeleton className="h-full w-full rounded-full" />
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                profile?.image &&
                                typeof profile.image === "string"
                                  ? profile.image
                                  : undefined
                              }
                              alt={
                                profile
                                  ? `${profile.first_name} ${profile.last_name}`
                                  : "@USER"
                              }
                            />
                            <AvatarFallback>{userInitials}</AvatarFallback>
                          </Avatar>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          {isLoading ? (
                            <>
                              <Skeleton className="h-5 w-24" />
                              <Skeleton className="h-4 w-32" />
                            </>
                          ) : (
                            <>
                              <p className="text-sm font-medium leading-none">
                                {profile
                                  ? `${profile.first_name || ""} ${
                                      profile.last_name || ""
                                    }`.trim()
                                  : ""}
                              </p>
                              <p className="text-xs leading-none text-muted-foreground">
                                {profile?.email || ""}
                              </p>
                            </>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {/* User Section */}
                      <DropdownMenuItem
                        className="w-full hover:cursor-pointer"
                        asChild
                      >
                        <Link href="/profile" className="flex w-full">
                          <User className="h-4 w-4" />
                          <span>{t("profile")}</span>
                        </Link>
                      </DropdownMenuItem>

                      {/* Jobs & Reviews Section */}
                      <DropdownMenuItem
                        className="w-full hover:cursor-pointer"
                        asChild
                      >
                        <Link href="/profile/my-jobs" className="flex  w-full">
                          <Briefcase className=" h-4 w-4" />
                          <span>{t("myJobs")}</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full hover:cursor-pointer"
                        asChild
                      >
                        <Link
                          href="/profile/my-reviews"
                          className="flex w-full"
                        >
                          <Star className="h-4 w-4" />
                          <span>{t("myReviews")}</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {/* Settings & Help Section */}
                      <DropdownMenuItem
                        className="w-full hover:cursor-pointer"
                        asChild
                      >
                        <Link href="/settings/account" className="flex w-full">
                          <Settings className="h-4 w-4" />
                          <span>{t("settings")}</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full hover:cursor-pointer"
                        asChild
                      >
                        <Link href="/help" className="flex w-full">
                          <HelpCircle className="h-4 w-4" />
                          <span>{t("help")}</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {/* Logout Section */}
                      <DropdownMenuItem
                        className="text-destructive hover:cursor-pointer"
                        onClick={async () => {
                          await logout();
                          router.replace("/login");
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{tCommon("actions.logout")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
