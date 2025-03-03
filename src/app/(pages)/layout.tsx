/**
 * PagesLayout - Main layout component for authenticated pages
 *
 * Provides a consistent layout structure for all authenticated pages within the application.
 * Handles responsive padding, maximum width constraints, and proper content organization.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 */

import React from "react";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

interface PagesLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Profile | Postuly",
  description: "Manage your professional profile, CV, and job applications.",
  openGraph: {
    title: "Profile | Postuly",
    description: "Manage your professional profile, CV, and job applications.",
    type: "profile",
    siteName: "Postuly",
  },
};

export default function PagesLayout({ children }: PagesLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        "pt-4 md:pt-8",
        "antialiased"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl",
          "px-4 sm:px-6 lg:px-8",
          "pb-24 md:pb-8"
        )}
      >
        <div className={cn("flex flex-col md:flex-row", "gap-8")}>
          <main
            className={cn(
              "flex-1 min-w-0",
              "relative",
              "animate-in fade-in duration-500"
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
