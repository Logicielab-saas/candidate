"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  Bell,
  FileText,
  Briefcase,
  MessageSquare,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Overview",
    href: "/profile",
    icon: User,
  },
  {
    title: "Applications",
    href: "#1",
    icon: Briefcase,
  },
  {
    title: "Resume",
    href: "#2",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "#3",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    href: "#4",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "#5",
    icon: Settings,
  },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-full md:w-64 space-y-1">
      {sidebarItems.map((item) => {
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
          >
            <Icon
              className={cn(
                "h-4 w-4 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary"
              )}
            />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
