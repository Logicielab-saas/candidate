import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { File, Image as ImageIcon, Loader2, Paperclip, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FileWithPreview extends File {
  preview?: string;
}

interface UploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload?: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string;
}

export function UploadDialog({
  isOpen,
  onOpenChange,
  onUpload,
  maxFiles = 5,
  acceptedTypes = ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png",
}: UploadDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Clean up previews when component unmounts
  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [selectedFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as FileWithPreview[];
    if (files.length + selectedFiles.length > maxFiles) {
      // You could show a toast here
      return;
    }

    // Create previews for image files
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        file.preview = URL.createObjectURL(file);
      }
    });

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => {
      const file = prev[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    try {
      // Here you would typically upload the files to your server
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated upload
      onUpload?.(selectedFiles);
      onOpenChange(false);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Partager des fichiers</DialogTitle>
          <DialogDescription>
            Sélectionnez jusqu&apos;à {maxFiles} fichiers à partager.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-4 text-center",
              "hover:border-primary/50 transition-colors duration-200",
              "cursor-pointer relative"
            )}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept={acceptedTypes}
              onChange={handleFileSelect}
            />
            <Paperclip className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Cliquez pour sélectionner des fichiers
            </p>
          </div>

          {selectedFiles.length > 0 && (
            <ScrollArea className="h-[200px] rounded-md border p-2">
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-accent/50"
                  >
                    <div className="flex items-center justify-between min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {file.type.startsWith("image/") && file.preview ? (
                      <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                        <Image
                          src={file.preview}
                          alt={file.name}
                          fill
                          className="object-contain bg-background/50"
                          sizes="(max-width: 425px) 100vw"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {file.type.startsWith("image/") ? (
                          <ImageIcon className="h-6 w-6" />
                        ) : (
                          <File className="h-6 w-6" />
                        )}
                        <span className="text-sm">Aperçu non disponible</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Annuler
          </Button>
          <Button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || isUploading}
            className="gap-2"
          >
            {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isUploading ? "Envoi en cours..." : "Envoyer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
