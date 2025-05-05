/**
 * SaveSearchAlert - Component for saving job search criteria as an alert
 *
 * Features:
 * - Save current search parameters as an alert
 * - Show confirmation when alert is saved
 * - View saved alerts
 */

"use client";

import { Button } from "@/components/ui/button";
import { Bell, BellRing, Eye, Edit2 } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertViewDialog } from "./AlertViewDialog";
import { AlertEditDialog } from "./AlertEditDialog";
import { useTranslations } from "next-intl";

export function SaveSearchAlert() {
  const [searchText] = useQueryState("q");
  const [salaryRange] = useQueryState("salary");
  const [isAlertSaved, setIsAlertSaved] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const t = useTranslations("emplois.alerts");

  // Don't show the button if there's no search query
  if (!searchText) return null;

  const handleSaveAlert = () => {
    setIsAlertSaved(true);
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);

    toast({
      title: t("success.title"),
      description: t("success.description"),
    });
  };

  const handleEdit = () => {
    setIsViewDialogOpen(false);
    setIsEditDialogOpen(true);
  };

  const handleView = () => {
    setIsViewDialogOpen(true);
  };

  if (isAlertSaved) {
    return (
      <>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BellRing className="h-4 w-4 text-primary" />
            <span>{t("active")}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleView}
                >
                  <Eye className="h-4 w-4 text-primaryHex-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("viewTooltip")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Edit2 className="h-4 w-4 text-primaryHex-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("editTooltip")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* View Dialog */}
        <AlertViewDialog
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
          searchText={searchText}
          salaryRange={salaryRange}
          onEdit={handleEdit}
        />

        {/* Edit Dialog */}
        <AlertEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          searchText={searchText}
          salaryRange={salaryRange}
          onSave={handleSaveAlert}
        />
      </>
    );
  }

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <Bell className="h-4 w-4" />
          <span>{t("create")}</span>
        </Button>
      </DialogTrigger>

      {/* Create Dialog - Reusing AlertEditDialog */}
      <AlertEditDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        searchText={searchText}
        salaryRange={salaryRange}
        onSave={handleSaveAlert}
      />
    </Dialog>
  );
}
