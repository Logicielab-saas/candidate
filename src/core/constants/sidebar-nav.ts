"use client";

/**
 * Sidebar Navigation Constants
 *
 * This module exports the navigation items for the sidebar profile and settings.
 * Each item contains a title, href, and an associated icon from lucide-react.
 *
 */

import { Settings, Briefcase, User, File } from "lucide-react";

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export const sidebarProfileNav: SidebarNavItem[] = [
  {
    title: "Overview",
    href: "/profile",
    icon: User,
  },
  {
    title: "Resume",
    href: "/profile/resume",
    icon: File,
  },
  {
    title: "Mes Emplois",
    href: "/profile/my-jobs",
    icon: Briefcase,
  },
  {
    title: "Settings",
    href: "#4",
    icon: Settings,
  },
];

export const sidebarSettingsNav: SidebarNavItem[] = [
  {
    title: "Account",
    href: "/settings/account",
    icon: Settings,
  },
];
