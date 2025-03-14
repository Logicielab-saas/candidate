"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/core/constants/sidebar-nav";

interface ProfileSidebarProps {
  navItems: SidebarNavItem[];
}

export function ProfileSidebar({ navItems }: ProfileSidebarProps) {
  const pathname = usePathname();
  // Mobile navigation items (limited to 4-5 items for better UX)
  const mobileNavItems = navItems.slice(0, 5);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        className="hidden md:block w-64 space-y-1"
        aria-label="Profile navigation"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-x-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                "hover:bg-primary/10 hover:text-primary",
                isActive
                  ? "bg-primary/10 text-primary font-semibold before:absolute relative before:inset-y-1 before:left-0 before:w-1 before:rounded-r-md before:bg-primary"
                  : "text-muted-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                )}
                aria-hidden="true"
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-lg z-50"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[4.5rem] gap-1 px-3 py-2 rounded-lg transition-colors",
                  "hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                <span className="text-xs font-medium text-center line-clamp-1 w-full">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
