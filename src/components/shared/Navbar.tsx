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
import { usePathname } from "next/navigation";

// interface NavItem {
//   name: string;
//   url: string;
//   icon: LucideIcon;
// }

// interface NavBarProps {
//   items: NavItem[];
//   className?: string;
// }
const navItems = [
  { name: "Emplois", url: "/emplois", icon: Home },
  { name: "Formations", url: "/formations", icon: User },
  { name: "Profile", url: "/profile", icon: Briefcase },
  {
    name: "Entreprises",
    url: "/companies/reviews",
    icon: Star,
  },
];

export function NavBar() {
  const pathname = usePathname();

  const activeTab =
    navItems.find(
      (item) => pathname === item.url || (item.url === "/" && pathname === "/")
    )?.name || "";

  return (
    <header className={cn("flex h-14 items-center gap-2 px-4")}>
      <div className="fixed top-0 left-0 right-0  z-50">
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
                        Navigate through the app
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {navItems.map((item) => {
                        const Icon = item.icon;
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
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/messages">
                      <MessageSquare className="h-5 w-5 " />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>

                  <ThemeButton />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full hover:cursor-pointer"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="https://placehold.co/64x64"
                            alt="@USER"
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            @USER
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            m@example.com
                          </p>
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
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>

                      {/* Jobs & Reviews Section */}
                      <DropdownMenuItem
                        className="w-full hover:cursor-pointer"
                        asChild
                      >
                        <Link href="/profile/my-jobs" className="flex  w-full">
                          <Briefcase className=" h-4 w-4" />
                          <span>Mes emplois</span>
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
                          <span>Mes avis</span>
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
                          <span>Paramètres</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full hover:cursor-pointer"
                        asChild
                      >
                        <Link href="/help" className="flex w-full">
                          <HelpCircle className="h-4 w-4" />
                          <span>Aide</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {/* Logout Section */}
                      <DropdownMenuItem className="text-destructive hover:cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Déconnexion</span>
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
