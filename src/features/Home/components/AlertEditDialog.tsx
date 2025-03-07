/**
 * AlertEditDialog - Component for editing alert settings
 */

"use client";

import { Button } from "@/components/ui/button";
import { Search, BellRing, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Une fois par jour" },
  { value: "weekly", label: "Une fois par semaine" },
] as const;

interface AlertEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchText: string;
  salaryRange: string | null;
  frequency: "daily" | "weekly";
  onFrequencyChange: (value: "daily" | "weekly") => void;
  onSave: () => void;
}

export function AlertEditDialog({
  isOpen,
  onClose,
  searchText,
  salaryRange,
  frequency,
  onFrequencyChange,
  onSave,
}: AlertEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BellRing className="h-6 w-6 text-primary" />
            Modifier l&apos;alerte
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {/* Search Criteria Card */}
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              Critères de recherche
            </h4>
            <div className="pl-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Recherche:
                </span>
                <span className="text-sm font-medium text-primaryHex-500">
                  {searchText}
                </span>
              </div>
              {salaryRange && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Salaire:
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-primaryHex-500">
                      {salaryRange.split(",").join("K€ - ")}K€
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mt-6 space-y-4">
            <div className="space-y-6 pl-6">
              {/* Frequency Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Label>Fréquence des notifications</Label>
                </div>
                <RadioGroup
                  value={frequency}
                  onValueChange={onFrequencyChange as (value: string) => void}
                  className="pl-6"
                >
                  {FREQUENCY_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onSave} className="gap-2">
            <BellRing className="h-4 w-4" />
            Mettre à jour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
