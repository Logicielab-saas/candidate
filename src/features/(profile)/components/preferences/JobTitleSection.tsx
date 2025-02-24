"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export function JobTitleSection() {
  const hasExistingTitle = true; // This will come from your state management
  const currentTitle = "Front end | Web Developper"; // This will come from your state management

  return (
    <div className="space-y-4">
      {hasExistingTitle ? (
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">{currentTitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                // Handle edit
              }}
            >
              <Edit className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                // Handle delete
              }}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            // Handle add
          }}
        >
          + Ajouter un intitulé de poste
        </Button>
      )}
    </div>
  );
}
