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
import { Bell, Check, Search, Euro, BellRing, Clock } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Une fois par jour" },
  { value: "weekly", label: "Une fois par semaine" },
] as const;

export function SaveSearchAlert() {
  const [searchText] = useQueryState("q");
  const [salaryRange] = useQueryState("salary");
  const [isAlertSaved, setIsAlertSaved] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [emailNotifications, setEmailNotifications] = useState(true);
  // const [pushNotifications, setPushNotifications] = useState(true);
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const { toast } = useToast();

  // Don't show the button if there's no search query
  if (!searchText) return null;

  const handleSaveAlert = () => {
    setIsAlertSaved(true);
    setIsDialogOpen(false);

    toast({
      title: "Alert créée avec succès",
      description:
        "Vous recevrez des notifications pour les nouveaux postes correspondant à vos critères.",
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isAlertSaved ? "outline" : "default"}
          size="sm"
          className={cn(
            "gap-2",
            isAlertSaved &&
              "border-green-500 text-green-500 hover:text-green-500"
          )}
        >
          {isAlertSaved ? (
            <>
              <Check className="h-4 w-4" />
              <span>Alerte Créée</span>
            </>
          ) : (
            <>
              <Bell className="h-4 w-4" />
              <span>Créer une Alerte</span>
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BellRing className="h-6 w-6 text-primary" />
            Créer une alerte emploi
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

          {/* Notification Settings */}
          <div className="mt-6 space-y-4">
            {/* <h4 className="font-medium flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              Paramètres de notification
            </h4> */}

            <div className="space-y-6 pl-6">
              {/* Email & Push Notifications */}
              {/* <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez les nouvelles offres par email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications push</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez les notifications sur votre navigateur
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
              </div> */}

              {/* Frequency Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Label>Fréquence des notifications</Label>
                </div>
                <RadioGroup
                  value={frequency}
                  onValueChange={setFrequency as (value: string) => void}
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
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleSaveAlert} className="gap-2">
            <BellRing className="h-4 w-4" />
            Créer l&apos;alerte
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
