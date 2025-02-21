import React from "react";
import { cn } from "@/lib/utils";


// TODO: ADD a sidebar for profile view
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-h-screen bg-background pt-4")}>
      {/* <ProfileSidebar /> */}
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8")}>
        <div className={cn("mx-auto max-w-full")}>
          <main className={cn("py-8")}>{children}</main>
        </div>
      </div>
    </div>
  );
}
