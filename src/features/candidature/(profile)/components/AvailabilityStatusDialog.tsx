"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface AvailabilityStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AvailabilityStatusDialog({
  open,
  onOpenChange,
}: AvailabilityStatusDialogProps) {
  const [isAvailable, setIsAvailable] = useState(false);
  const tCommon = useTranslations("common");

  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    // TODO: Implement API call to update availability status
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tCommon("preferences.availability.title")}</DialogTitle>
          <DialogDescription>
            {tCommon("preferences.availability.dialog.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="availability" className="flex flex-col space-y-1">
              <span>
                {tCommon("preferences.availability.dialog.switch.label")}
              </span>
              <span className="font-normal text-sm text-muted-foreground">
                {tCommon("preferences.availability.dialog.switch.description")}
              </span>
            </Label>
            <Switch
              id="availability"
              checked={isAvailable}
              onCheckedChange={handleAvailabilityChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tCommon("actions.close")}
          </Button>
          <Button
            type="submit"
            onClick={() => {
              // TODO: Save changes if needed
              onOpenChange(false);
            }}
          >
            {tCommon("actions.save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
