"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function JobTypesSection() {
  const jobTypes: string[] = []; // This will come from your state management

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {jobTypes.map((type, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <p className="text-sm font-medium">{type}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                // Handle remove
              }}
            >
              <Plus className="h-4 w-4 rotate-45 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => {
          // Handle add
        }}
      >
        + Ajouter des types de postes
      </Button>
    </div>
  );
}
