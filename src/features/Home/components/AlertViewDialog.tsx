/**
 * AlertViewDialog - Component for viewing alert details
 */

"use client";

import { Button } from "@/components/ui/button";
import { Search, Euro, BellRing, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface AlertViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchText: string;
  salaryRange: string | null;
  frequency: "daily" | "weekly";
  onEdit: () => void;
}

export function AlertViewDialog({
  isOpen,
  onClose,
  searchText,
  salaryRange,
  frequency,
  onEdit,
}: AlertViewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BellRing className="h-6 w-6 text-primary" />
            Détails de l&apos;alerte
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
                <span className="text-sm font-medium">{searchText}</span>
              </div>
              {salaryRange && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Salaire:
                  </span>
                  <div className="flex items-center gap-1">
                    <Euro className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {salaryRange.split(",").join("K€ - ")}K€
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alert Settings */}
          <div className="mt-6 space-y-4">
            <div className="space-y-6 pl-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Label>Fréquence des notifications</Label>
                </div>
                <div className="pl-6">
                  <p className="text-sm text-muted-foreground">
                    {frequency === "daily"
                      ? "Une fois par jour"
                      : "Une fois par semaine"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button onClick={onEdit} className="gap-2">
            <BellRing className="h-4 w-4" />
            Modifier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
