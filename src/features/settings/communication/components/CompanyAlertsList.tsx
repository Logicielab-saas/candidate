/**
 * CompanyAlertsList - Component for displaying and managing company alerts
 *
 * Displays a list of user's company alerts with options to delete
 * and toggle each alert's enabled status.
 */

"use client";

import { useState } from "react";
import { UserCompanyAlert } from "@/core/interfaces/user-alert.interface";
import { userCompanyAlerts as initialAlerts } from "@/core/mockData/user-alerts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Building } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export function CompanyAlertsList() {
  const [alerts, setAlerts] = useState<UserCompanyAlert[]>(initialAlerts);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<UserCompanyAlert | null>(
    null
  );
  const { toast } = useToast();
  const t = useTranslations("settings.communication.companyAlerts");
  const tCommon = useTranslations("common.actions");

  const handleToggleAlert = (id: string, isEnabled: boolean) => {
    setAlerts(
      alerts.map((alert) => (alert.id === id ? { ...alert, isEnabled } : alert))
    );

    toast({
      title: isEnabled
        ? t("toast.toggle.enable.title")
        : t("toast.toggle.disable.title"),
      description: t("toast.toggle.description", {
        state: isEnabled ? tCommon("enabled") : tCommon("disabled"),
      }),
    });
  };

  const handleDeleteClick = (alert: UserCompanyAlert) => {
    setSelectedAlert(alert);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedAlert) {
      setAlerts(alerts.filter((alert) => alert.id !== selectedAlert.id));
      setIsDeleteDialogOpen(false);

      toast({
        title: t("toast.delete.title"),
        description: t("toast.delete.description"),
      });
    }
  };

  return (
    <div className="space-y-4">
      {alerts.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground">{t("empty.description")}</p>
        </div>
      ) : (
        alerts.map((alert) => (
          <Card key={alert.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">{alert.company}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={alert.isEnabled}
                    onCheckedChange={(checked) =>
                      handleToggleAlert(alert.id, checked)
                    }
                    aria-label={t("switch.ariaLabel", {
                      action: alert.isEnabled
                        ? tCommon("disable")
                        : tCommon("enable"),
                      company: alert.company,
                    })}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(alert)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("deleteDialog.title")}</DialogTitle>
          </DialogHeader>
          <p>
            {t("deleteDialog.description", {
              company: selectedAlert?.company || "",
            })}
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {tCommon("cancel")}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {tCommon("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
