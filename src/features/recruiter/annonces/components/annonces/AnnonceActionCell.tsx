"use client";

import {
  MoreHorizontal,
  Edit,
  Eye,
  Globe,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { AnnonceDeleteDialog } from "./AnnonceDeleteDialog";

interface AnnonceActionCellProps {
  annonceName: string;
  annonceId: number;
}

export function AnnonceActionCell({
  annonceName,
  annonceId,
}: AnnonceActionCellProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-3 w-3 -pr-3">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-2.5 w-2.5 rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
          <Edit className="h-3.5 w-3.5" />
          <Link href={`/recruiter/annonces/edit-annonce/${annonceId}`}>
            Modifier l&apos;annonce
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
          <Eye className="h-3.5 w-3.5" />
          <Link href={`/recruiter/annonces/details/${annonceId}`}>
            Voir le détail de l&apos;annonce
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
          <Globe className="h-3.5 w-3.5" />
          <span>Afficher la page Emploi publique</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Sponsoriser l&apos;annonce</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 py-2 text-sm text-red-600 dark:text-red-400 cursor-pointer"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Supprimer l&apos;annonce</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isDeleteDialogOpen && (
        <AnnonceDeleteDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          annonceId={annonceId}
          annonceName={annonceName}
        />
      )}
    </DropdownMenu>
  );
}
