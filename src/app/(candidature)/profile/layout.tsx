import React from "react";
import { Sidebar } from "@/components/shared/Sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full bg-background pt-14">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 [@media(min-width:1030px)]:ml-64">
          <div className="h-full w-full p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
