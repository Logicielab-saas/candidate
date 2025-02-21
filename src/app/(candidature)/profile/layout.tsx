import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full bg-background pt-14">
      <main>
        <div className="h-full w-full max-w-7xl mx-auto p-8 pb-24 md:pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
