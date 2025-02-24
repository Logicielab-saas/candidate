"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MoreVertical,
  Bookmark,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SavedJobItemProps {
  title: string;
  company: string;
  location: string;
  savedDate: string;
  onApply: () => void;
  onRemove: () => void;
}

export function SavedJobItem({
  title,
  company,
  location,
  savedDate,
  onApply,
  onRemove,
}: SavedJobItemProps) {
  return (
    <>
      <div className="py-4 flex items-start justify-between group">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium">{title}</h3>
          </div>

          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Enregistré le {savedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onApply} size="sm">
            Postuler
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-muted-foreground hover:text-primary"
          >
            <Bookmark className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onRemove}>
                Retirer des favoris
              </DropdownMenuItem>
              <DropdownMenuItem>Signaler l&apos;annonce</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </>
  );
}
