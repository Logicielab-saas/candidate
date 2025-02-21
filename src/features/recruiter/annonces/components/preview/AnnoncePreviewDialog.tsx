"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function AnnoncePreviewDialog() {
  const { description } = useCreateAnnonceStore();
  const hasDescription = description && description.trim() !== "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 hover:bg-accent">
          <Eye className="h-4 w-4" />
          Aperçu
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <DialogTitle className="text-xl font-semibold">
              Description du poste
            </DialogTitle>
          </div>
          <Separator />
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4 mt-2">
          <div className="space-y-4">
            {hasDescription ? (
              <div
                className={cn(
                  "prose prose-zinc dark:prose-invert max-w-none",
                  "prose-headings:font-semibold prose-headings:text-foreground",
                  "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
                  "prose-p:leading-7 prose-p:my-4",
                  "prose-ul:leading-7 prose-ul:my-4",
                  "prose-li:marker:text-primary",
                  "prose-strong:font-semibold prose-strong:text-foreground",
                  "prose-a:text-primary hover:prose-a:text-primary/80",
                  "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground",
                  "prose-pre:bg-muted prose-pre:text-muted-foreground"
                )}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-sm">
                  Aucune description n&apos;a encore été fournie pour ce poste
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
