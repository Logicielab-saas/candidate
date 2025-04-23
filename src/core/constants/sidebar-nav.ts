"use client";

/**
 * Sidebar Navigation Constants
 *
 * This module exports the navigation items for the sidebar profile and settings.
 * Each item contains a title, href, and an associated icon from lucide-react.
 *
 */

import {
  Settings,
  Briefcase,
  User,
  File,
  MessageSquare,
  Smartphone,
  ShieldEllipsis,
  Star,
} from "lucide-react";

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export const sidebarProfileNav: SidebarNavItem[] = [
  {
    title: "overview",
    href: "/profile",
    icon: User,
  },
  {
    title: "resume",
    href: "/profile/resume",
    icon: File,
  },
  {
    title: "myJobs",
    href: "/profile/my-jobs",
    icon: Briefcase,
  },
  {
    title: "myReviews",
    href: "/profile/my-reviews",
    icon: Star,
  },
  {
    title: "settings",
    href: "/settings/account",
    icon: Settings,
  },
];

export const sidebarSettingsNav: SidebarNavItem[] = [
  {
    title: "accountSettings",
    href: "/settings/account",
    icon: Settings,
  },
  {
    title: "communicationSettings",
    href: "/settings/communication",
    icon: MessageSquare,
  },
  {
    title: "deviceSettings",
    href: "/settings/devices",
    icon: Smartphone,
  },
  {
    title: "privacySettings",
    href: "/settings/privacy",
    icon: ShieldEllipsis,
  },
];
