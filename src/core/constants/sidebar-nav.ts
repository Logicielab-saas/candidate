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
    title: "Mes avis",
    href: "/profile/my-reviews",
    icon: Star,
  },
  {
    title: "Settings",
    href: "/settings/account",
    icon: Settings,
  },
];

export const sidebarSettingsNav: SidebarNavItem[] = [
  {
    title: "Paramètres du compte",
    href: "/settings/account",
    icon: Settings,
  },
  {
    title: "Communication connectée",
    href: "/settings/communication",
    icon: MessageSquare,
  },
  {
    title: "Supervision des appareils",
    href: "/settings/devices",
    icon: Smartphone,
  },
  {
    title: "Réglages de confidentialité",
    href: "/settings/privacy",
    icon: ShieldEllipsis,
  },
];
