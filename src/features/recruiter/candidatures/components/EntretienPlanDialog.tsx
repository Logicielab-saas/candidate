"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, Phone, MapPin } from "lucide-react";

interface EntretienPlanDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  candidat: {
    nom: string;
  };
}

const DURATIONS = [
  { value: "15", label: "15 min" },
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "1 heure" },
];

const FORMATS = [
  {
    value: "video",
    label: "Vidéo",
    icon: Video,
  },
  {
    value: "telephone",
    label: "Téléphone",
    icon: Phone,
  },
  {
    value: "person",
    label: "En personne",
    icon: MapPin,
  },
];

export function EntretienPlanDialog({
  isOpen,
  onOpenChange,
  candidat,
}: EntretienPlanDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Programmer un entretien avec {candidat.nom}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-4">
          {/* Left Side */}
          <div className="flex flex-col gap-4">
            {/* Duration Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Durée
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une durée" />
                </SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Format Buttons */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Format
              </label>
              <div className="flex gap-2">
                {FORMATS.map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    variant="outline"
                    className="flex-1 gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Adresse de l&apos;entretien
              </label>
              <Input placeholder="Saisissez l'adresse" />
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Message destiné à {candidat.nom}
              </label>
              <Textarea
                placeholder="Écrivez un message..."
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Team Members Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Ajouter des membres d&apos;équipe
              </label>
              <Input placeholder="Saisissez les adresses email en les séparant par une virgule" />
            </div>
          </div>

          {/* Right Side - Will be implemented later */}
          <div className="border-l border-zinc-200 dark:border-zinc-700 pl-6">
            {/* Calendar will go here */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
