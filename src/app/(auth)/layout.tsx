import React from "react";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { NavbarWrapper } from "@/components/shared/NavbarWrapper";
import { isAuthenticated } from "@/lib/cookies";
import { redirect } from "next/navigation";
// import { NavBar } from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Login | Postuly",
  description: "Login to your Postuly account.",
  openGraph: {
    title: "Login | Postuly",
    description: "Login to your Postuly account.",
    type: "profile",
  },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //* Check if user logged in then dont show auth pages
  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) redirect("/emplois");
  return (
    <>
      <NavbarWrapper />

      <div className={cn("min-h-screen bg-background pt-4 md:pt-8")}>
        <div
          className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 md:pb-8")}
        >
          <div className={cn("flex flex-col md:flex-row gap-8")}>
            <main className={cn("flex-1 min-w-0")}>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
