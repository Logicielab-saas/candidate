"use client";

import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface PreferenceSectionProps {
  title: string;
  children: ReactNode;
}

export function PreferenceSection({ title, children }: PreferenceSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <div>{children}</div>
      <Separator />
    </div>
  );
}
