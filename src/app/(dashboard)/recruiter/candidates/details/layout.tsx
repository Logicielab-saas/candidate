import React from "react";
interface CandidateDetailsLayoutProps {
  children: React.ReactNode;
}

export default async function CandidateDetailsLayout({
  children,
}: CandidateDetailsLayoutProps) {
  return (
    <div className="relative min-w-0 shrink-0 min-h-0 p-0">{children}</div>
  );
}
