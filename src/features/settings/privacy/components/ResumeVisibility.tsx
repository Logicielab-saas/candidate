/**
 * ResumeVisibility - Component for managing resume visibility
 *
 * Client component that provides a toggle for controlling
 * the visibility of the user's resume.
 */

"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ResumeVisibility() {
  const [isHidden, setIsHidden] = useState(false);
  const { toast } = useToast();

  const handleToggleVisibility = (checked: boolean) => {
    setIsHidden(checked);
    toast({
      title: checked ? "CV masqué" : "CV visible",
      description: `Votre CV est maintenant ${
        checked ? "masqué" : "visible"
      } pour les recruteurs.`,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <div className="font-medium">Masquer mon CV</div>
        <div className="text-sm text-muted-foreground">
          Masquer temporairement votre CV des résultats de recherche des
          recruteurs
        </div>
      </div>
      <Switch
        checked={isHidden}
        onCheckedChange={handleToggleVisibility}
        aria-label="Toggle resume visibility"
      />
    </div>
  );
}
