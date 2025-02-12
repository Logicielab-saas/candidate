"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Copy, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

interface AppelerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  candidat: {
    nom: string;
    telephone: string;
  };
}

export function AppelerDialog({
  isOpen,
  onOpenChange,
  candidat,
}: AppelerDialogProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(candidat.telephone);
    toast({
      description: "Numéro de téléphone copié !",
      duration: 3000,
    });
  };

  const handleCall = () => {
    onOpenChange(false);
    router.push(`tel:${candidat.telephone}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors"
          onSelect={(e) => e.preventDefault()}
        >
          <Phone className="h-4 w-4 text-green-600" />
          <span>Appeler</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Appeler {candidat.nom}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="text-base font-medium">
                {candidat.telephone}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="gap-2 hover:bg-zinc-100"
              onClick={handleCopyNumber}
            >
              <Copy className="h-4 w-4" />
              <span>Copier</span>
            </Button>
          </div>
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
            onClick={handleCall}
          >
            <Phone className="h-4 w-4" />
            Appeler maintenant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
