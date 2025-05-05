/**
 * AlertViewDialog - Component for viewing alert details
 */

"use client";

import { Button } from "@/components/ui/button";
import { Search, BellRing } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

interface AlertViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchText: string;
  salaryRange: string | null;
  onEdit: () => void;
}

export function AlertViewDialog({
  isOpen,
  onClose,
  searchText,
  salaryRange,
  onEdit,
}: AlertViewDialogProps) {
  const t = useTranslations("emplois.alerts.dialog.view");
  const tCommon = useTranslations("common");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BellRing className="h-6 w-6 text-primary" />
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {/* Search Criteria Card */}
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              {t("searchCriteria")}
            </h4>
            <div className="pl-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {tCommon("labels.search")}:
                </span>
                <span className="text-sm font-medium text-primaryHex-500">
                  {searchText}
                </span>
              </div>
              {salaryRange && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {tCommon("labels.salary")}:
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
        </div>

        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={onClose}>
            {tCommon("actions.close")}
          </Button>
          <Button onClick={onEdit} className="gap-2">
            <BellRing className="h-4 w-4" />
            {tCommon("actions.edit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
