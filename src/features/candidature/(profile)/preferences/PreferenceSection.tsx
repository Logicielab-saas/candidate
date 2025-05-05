"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface PreferenceSectionProps {
  title: string;
  children: React.ReactNode;
  showAddButton?: boolean;
}

export function PreferenceSection({
  title,
  children,
  showAddButton = true,
}: PreferenceSectionProps) {
  const tCommon = useTranslations("common");
  return (
    <section className="space-y-4 border p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {showAddButton && (
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => {
              const addButton = document.querySelector(
                `[data-section="${title}"] [data-add-button]`
              );
              if (addButton instanceof HTMLButtonElement) {
                addButton.click();
              }
            }}
          >
            <Plus className="mr-1" />
            {tCommon("actions.add")}
          </Button>
        )}
      </div>
      <div data-section={title}>{children}</div>
    </section>
  );
}
