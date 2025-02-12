"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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

type FormatType = {
  value: "video" | "telephone" | "person";
  label: string;
  icon: React.ElementType;
};

const FORMATS: FormatType[] = [
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
  const [format, setFormat] = useState<FormatType["value"]>("video");

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
              <Label htmlFor="duration">Durée</Label>
              <Select>
                <SelectTrigger id="duration">
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

            {/* Format Radio Group */}
            <div className="space-y-2">
              <Label>Format</Label>
              <RadioGroup
                value={format}
                onValueChange={(value: FormatType["value"]) => setFormat(value)}
                className="flex gap-2"
              >
                {FORMATS.map(({ value, label, icon: Icon }) => (
                  <Label
                    key={value}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium
                      ${
                        format === value
                          ? "border-primaryHex-500 text-primaryHex-500 "
                          : ""
                      } cursor-pointer`}
                  >
                    <RadioGroupItem value={value} className="sr-only" />
                    <Icon className="h-4 w-4" />
                    {label}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <Label htmlFor="address">Adresse de l&apos;entretien</Label>
              <Input id="address" placeholder="Saisissez l'adresse" />
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <Label htmlFor="message">Message destiné à {candidat.nom}</Label>
              <Textarea
                id="message"
                placeholder="Écrivez un message..."
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Team Members Input */}
            <div className="space-y-2">
              <Label htmlFor="team">Ajouter des membres d&apos;équipe</Label>
              <Input
                id="team"
                placeholder="Saisissez les adresses email en les séparant par une virgule"
              />
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
