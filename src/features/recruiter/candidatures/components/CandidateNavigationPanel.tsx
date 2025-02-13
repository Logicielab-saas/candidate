import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockCandidates } from "@/app/(dashboard)/recruiter/candidates/page";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

interface CandidateNavigationPanelProps {
  currentCandidateId?: string;
}

const STATUS_OPTIONS = {
  nouveau: "Nouveau",
  "en-cours-examen": "En cours d'examen",
  contacte: "Contacté(e)",
  "en-cours-entretien": "En cours d'entretien",
  ecarte: "Écarté(e)",
  embauche: "Embauché(e)",
} as const;

export function CandidateNavigationPanel({
  currentCandidateId,
}: CandidateNavigationPanelProps) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  const currentCandidate = mockCandidates.find(
    (c) => c.nom === currentCandidateId
  );

  const [status, setStatus] = useState<keyof typeof STATUS_OPTIONS>(
    (currentCandidate?.statut as keyof typeof STATUS_OPTIONS) || "nouveau"
  );

  // Update status when candidate changes
  useEffect(() => {
    if (currentCandidate) {
      setStatus(currentCandidate.statut as keyof typeof STATUS_OPTIONS);
    }
  }, [currentCandidate]);

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
    <div className="w-[300px] flex flex-col gap-6">
      {/* Status Container */}
      <div className="p-4 border rounded-lg bg-background h-[calc(100vh-600px)]">
        <div className="space-y-4 h-full flex flex-col">
          <div>
            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as keyof typeof STATUS_OPTIONS)
              }
            >
              <SelectTrigger>
                <span className="flex items-center gap-1">
                  <span className="text-muted-foreground">Statut:</span>
                  <span>{STATUS_OPTIONS[status]}</span>
                </span>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(STATUS_OPTIONS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Activity Feed */}
          <div>
            <h3 className="text-sm font-medium mb-3">Feed d&apos;activité</h3>
            {currentCandidate && (
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex flex-col gap-1 pb-2 border-b">
                  <span className="text-foreground font-medium">
                    A postulé pour {currentCandidate.titreOffre}
                  </span>
                  <time className="text-xs">
                    {format(new Date(), "d MMMM yyyy 'à' HH:mm", {
                      locale: fr,
                    })}
                  </time>
                </div>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="flex-1 flex flex-col min-h-0">
            <label className="text-sm font-medium mb-2 block">
              Note personnelle
            </label>
            <div className="space-y-4 flex-1 flex flex-col min-h-0">
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
              {notes.length > 0 && (
                <ScrollArea className="flex-1 min-h-0">
                  <div className="space-y-3 pt-3 border-t">
                    {notes.map((note) => (
                      <div key={note.id} className="text-sm space-y-1">
                        <p className="text-foreground">{note.content}</p>
                        <time className="text-xs text-muted-foreground">
                          {format(note.createdAt, "d MMMM yyyy 'à' HH:mm", {
                            locale: fr,
                          })}
                        </time>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
