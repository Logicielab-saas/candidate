import React from "react";
import { cn } from "@/lib/utils";
import { ProfileSidebar } from "@/components/shared/profile-sidebar";
import { Metadata } from "next";
import { sidebarProfileNav } from "@/core/constants/sidebar-nav";

export const metadata: Metadata = {
  title: "Profile | Postuly",
  description: "Manage your professional profile, CV, and job applications.",
  openGraph: {
    title: "Profile | Postuly",
    description: "Manage your professional profile, CV, and job applications.",
    type: "profile",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-h-screen bg-background pt-4 md:pt-8")}>
      <div
        className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 md:pb-8")}
      >
        <div className={cn("flex flex-col md:flex-row gap-8")}>
          <aside className="md:w-64 flex-shrink-0">
            <div className="sm:sticky sm:top-20">
              <ProfileSidebar navItems={sidebarProfileNav} />
            </div>
          </aside>
          <main className={cn("flex-1 min-w-0")}>{children}</main>
        </div>
      </div>
    </div>
  );
}
