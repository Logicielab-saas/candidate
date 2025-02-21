"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  Bell,
  Briefcase,
  Star,
  HelpCircle,
  LogOut,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ElementType;
  }[];
}

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              "transition-colors",
              isActive && "bg-accent text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Mes emplois",
    href: "/profile/jobs",
    icon: Briefcase,
  },
  {
    title: "Mes avis",
    href: "/profile/reviews",
    icon: Star,
  },
  {
    title: "Notifications",
    href: "/profile/notifications",
    icon: Bell,
  },
  {
    title: "Paramètres",
    href: "/profile/settings",
    icon: Settings,
  },
  {
    title: "Aide",
    href: "/profile/help",
    icon: HelpCircle,
  },
];

function SidebarContent() {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <SidebarNav items={sidebarNavItems} />
        </div>
        <Separator className="mx-4" />
        <div className="px-3 py-2">
          <Link
            href="/logout"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="truncate">Déconnexion</span>
          </Link>
        </div>
      </div>
    </ScrollArea>
  );
}

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed hidden h-[calc(100vh-3.5rem)] w-64 border-r [@media(min-width:1030px)]:block">
        <SidebarContent />
      </aside>

      {/* Mobile Trigger */}
      <div className="fixed left-4 top-[4.5rem] z-40 [@media(min-width:1030px)]:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="px-6 py-4 text-left">
              <SheetTitle className="text-primaryHex-500">Postuly</SheetTitle>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
