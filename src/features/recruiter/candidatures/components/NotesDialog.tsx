"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { StickyNote } from "lucide-react";

interface Note {
  id: string;
  content: string;
  createdAt: Date;
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
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = () => {
    if (!note.trim()) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      content: note.trim(),
      createdAt: new Date(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setNote("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            <span>Notes - {candidateNom}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 flex flex-col gap-4">
          {/* Add Note Form */}
          <div className="space-y-2">
            <Textarea
              placeholder="Ajouter une note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none"
              rows={4}
            />
            <Button
              className="w-full"
              disabled={!note.trim()}
              onClick={handleAddNote}
            >
              Ajouter la note
            </Button>
          </div>

          {/* Notes List */}
          {notes.length > 0 ? (
            <ScrollArea className="flex-1 min-h-0">
              <div className="space-y-3 pt-3 border-t border-border">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="text-sm space-y-1 p-3 rounded-lg border border-border bg-accent/50"
                  >
                    <p className="text-foreground whitespace-pre-wrap">
                      {note.content}
                    </p>
                    <time className="text-xs text-muted-foreground block">
                      {format(note.createdAt, "d MMMM yyyy 'à' HH:mm", {
                        locale: fr,
                      })}
                    </time>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Aucune note pour le moment
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
