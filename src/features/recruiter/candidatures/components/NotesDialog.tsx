"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { StickyNote } from "lucide-react";

interface Note {
  content: string;
  updatedAt: Date;
}

interface NotesDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  candidateNom?: string;
}

export function NotesDialog({
  isOpen,
  onOpenChange,
  candidateNom,
}: NotesDialogProps) {
  const [note, setNote] = useState<Note>({
    content: "",
    updatedAt: new Date(),
  });
  const [inputValue, setInputValue] = useState("");

  const handleUpdateNote = () => {
    if (!inputValue.trim()) return;

    setNote({
      content: inputValue.trim(),
      updatedAt: new Date(),
    });
    setInputValue("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            <span>Note - {candidateNom}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 flex flex-col gap-4">
          {/* Existing Note Display */}
          {note.content ? (
            <div className="rounded-lg border border-border bg-accent/50 p-4">
              <p className="text-sm whitespace-pre-wrap text-foreground mb-2">
                {note.content}
              </p>
              <time className="text-xs text-muted-foreground block">
                Dernière mise à jour le{" "}
                {format(note.updatedAt, "d MMMM yyyy 'à' HH:mm", {
                  locale: fr,
                })}
              </time>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-4">
              Aucune note pour le moment
            </div>
          )}

          {/* Note Input Form */}
          <div className="space-y-2 border-t pt-4">
            <Textarea
              placeholder="Modifier la note..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="resize-none"
              rows={4}
            />
            <Button
              className="w-full"
              disabled={!inputValue.trim()}
              onClick={handleUpdateNote}
            >
              Mettre à jour la note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
