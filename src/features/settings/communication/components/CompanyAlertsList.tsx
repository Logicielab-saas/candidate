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

export function CompanyAlertsList() {
  const [alerts, setAlerts] = useState<UserCompanyAlert[]>(initialAlerts);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<UserCompanyAlert | null>(
    null
  );
  const { toast } = useToast();

  const handleToggleAlert = (id: string, isEnabled: boolean) => {
    setAlerts(
      alerts.map((alert) => (alert.id === id ? { ...alert, isEnabled } : alert))
    );

    toast({
      title: isEnabled ? "Alerte activée" : "Alerte désactivée",
      description: `L'alerte a été ${
        isEnabled ? "activée" : "désactivée"
      } avec succès.`,
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
        title: "Alerte supprimée",
        description: "L'alerte a été supprimée avec succès.",
      });
    }
  };

  return (
    <div className="space-y-4">
      {alerts.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground">
            Vous n&apos;avez pas encore créé d&apos;alertes d&apos;entreprise.
          </p>
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
            <DialogTitle>Supprimer l&apos;alerte</DialogTitle>
          </DialogHeader>
          <p>
            Êtes-vous sûr de vouloir supprimer cette alerte pour{" "}
            <span className="font-medium">{selectedAlert?.company}</span> ?
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
    </div>
  );
}
