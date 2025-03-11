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

export function JobAlertsList() {
  const [alerts, setAlerts] = useState<UserAlert[]>(initialAlerts);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<UserAlert | null>(null);
  const { toast } = useToast();

  const handleToggleAlert = (id: string, isEnabled: boolean) => {
    setAlerts(
      alerts.map((alert) => (alert.id === id ? { ...alert, isEnabled } : alert))
    );

    toast({
      variant: "success",
      title: isEnabled ? "Alerte activée" : "Alerte désactivée",
      description: `L'alerte a été ${
        isEnabled ? "activée" : "désactivée"
      } avec succès.`,
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
        title: "Alerte supprimée",
        description: "L'alerte a été supprimée avec succès.",
      });
    }
  };

  const handleSaveAlert = (updatedAlert: UserAlert) => {
    if (selectedAlert) {
      // Edit existing alert
      setAlerts(
        alerts.map((alert) =>
          alert.id === updatedAlert.id ? updatedAlert : alert
        )
      );
      setIsEditDialogOpen(false);

      toast({
        variant: "success",
        title: "Alerte mise à jour",
        description: "L'alerte a été mise à jour avec succès.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Mes alertes d&apos;emploi</h3>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/20">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Aucune alerte</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Vous n&apos;avez pas encore créé d&apos;alertes d&apos;emploi.
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
                          Salary: {alert.salaryRange.split(",").join("K€ - ")}K€
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
                      aria-label={
                        alert.isEnabled
                          ? "Désactiver l&apos;alerte"
                          : "Activer l&apos;alerte"
                      }
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditClick(alert)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteClick(alert)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
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
            <DialogTitle>Supprimer l&apos;alerte</DialogTitle>
          </DialogHeader>
          <p className="pt-2 pb-4">
            Êtes-vous sûr de vouloir supprimer cette alerte ? Cette action ne
            peut pas être annulée.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier l&apos;alerte</DialogTitle>
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
