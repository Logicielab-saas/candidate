/**
 * JobAlertsList - Component for displaying and managing job alerts
 *
 * Displays a list of user's job alerts with options to edit, delete,
 * and toggle each alert's enabled status.
 */

"use client";

import { useState } from "react";
import { UserAlert } from "@/core/interfaces/user-alert.interface";
import { userAlerts as initialAlerts } from "@/core/mockData/user-alerts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, AlertCircle, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { JobAlertForm } from "./JobAlertForm";
import { useTranslations } from 'next-intl';

export function JobAlertsList() {
  const [alerts, setAlerts] = useState<UserAlert[]>(initialAlerts);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<UserAlert | null>(null);
  const { toast } = useToast();
  const t = useTranslations('settings.communication.jobAlerts');
  const tCommon = useTranslations('common.actions');

  const handleToggleAlert = (id: string, isEnabled: boolean) => {
    setAlerts(
      alerts.map((alert) => (alert.id === id ? { ...alert, isEnabled } : alert))
    );

    toast({
      variant: "success",
      title: isEnabled ? t('toast.toggle.enable.title') : t('toast.toggle.disable.title'),
      description: t('toast.toggle.description', { 
        state: isEnabled ? tCommon('enabled') : tCommon('disabled') 
      }),
    });
  };

  const handleEditClick = (alert: UserAlert) => {
    setSelectedAlert(alert);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (alert: UserAlert) => {
    setSelectedAlert(alert);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedAlert) {
      setAlerts(alerts.filter((alert) => alert.id !== selectedAlert.id));
      setIsDeleteDialogOpen(false);

      toast({
        variant: "success",
        title: t('toast.delete.title'),
        description: t('toast.delete.description'),
      });
    }
  };

  const handleSaveAlert = (updatedAlert: UserAlert) => {
    if (selectedAlert) {
      setAlerts(
        alerts.map((alert) =>
          alert.id === updatedAlert.id ? updatedAlert : alert
        )
      );
      setIsEditDialogOpen(false);

      toast({
        variant: "success",
        title: t('toast.edit.title'),
        description: t('toast.edit.description'),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t('myAlerts')}</h3>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/20">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">{t('empty.title')}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t('empty.description')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1 flex-1">
                    <h4 className="font-medium text-base">{alert.post}</h4>
                    <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
                      {alert.city && (
                        <div className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {alert.city}
                        </div>
                      )}
                      {alert.salaryRange && (
                        <div className="flex items-center">
                          {t('salary')}: {alert.salaryRange.split(",").join("K€ - ")}K€
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={alert.isEnabled}
                      onCheckedChange={(checked) =>
                        handleToggleAlert(alert.id, checked)
                      }
                      aria-label={t('switch.ariaLabel', {
                        action: alert.isEnabled ? tCommon('disable') : tCommon('enable'),
                        alert: alert.post
                      })}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditClick(alert)}
                    >
                      <Pencil className="h-4 w-4 text-primaryHex-600" />
                      <span className="sr-only">{tCommon('edit')}</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteClick(alert)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">{tCommon('delete')}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('deleteDialog.title')}</DialogTitle>
          </DialogHeader>
          <p className="pt-2 pb-4">
            {t('deleteDialog.description')}
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {tCommon('cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {tCommon('delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('editDialog.title')}</DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <JobAlertForm
              initialValues={selectedAlert}
              onSave={handleSaveAlert}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
