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
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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

  const validateFileType = (file: File): boolean => {
    const acceptedExtensions = acceptedTypes
      .split(",")
      .map((type) => type.trim());
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    return acceptedExtensions.includes(fileExtension);
  };

  const processFiles = useCallback(
    (files: File[]) => {
      const newFiles = Array.from(files) as FileWithPreview[];

      // Check if adding new files would exceed the limit
      if (newFiles.length + selectedFiles.length > maxFiles) {
        toast({
          variant: "warning",
          title: "Limite de fichiers atteinte",
          description: `Vous ne pouvez pas télécharger plus de ${maxFiles} fichiers à la fois.`,
        });
        return;
      }

      // Validate file types
      const invalidFiles = newFiles.filter((file) => !validateFileType(file));
      if (invalidFiles.length > 0) {
        toast({
          variant: "destructive",
          title: "Type de fichier non pris en charge",
          description: `Les types de fichiers acceptés sont : ${acceptedTypes}`,
        });
        return;
      }

      // Create previews for image files
      newFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          file.preview = URL.createObjectURL(file);
        }
      });

      setSelectedFiles((prev) => [...prev, ...newFiles]);

      // Show success toast
      toast({
        variant: "default",
        title: "Fichiers ajoutés",
        description: `${newFiles.length} fichier${
          newFiles.length > 1 ? "s" : ""
        } ajouté${newFiles.length > 1 ? "s" : ""} avec succès.`,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxFiles, selectedFiles.length, toast, acceptedTypes]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    [processFiles]
  );

  const removeFile = (index: number) => {
    const fileToRemove = selectedFiles[index];
    const fileName = fileToRemove.name;

    // Clean up preview URL if it exists
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    // Update state
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

    // Show toast after state update
    setTimeout(() => {
      toast({
        variant: "info",
        title: "Fichier supprimé",
        description: `${fileName} a été supprimé.`,
      });
    }, 0);
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

      // Show success toast
      toast({
        variant: "success",
        title: "Téléchargement réussi",
        description: `${selectedFiles.length} fichier${
          selectedFiles.length > 1 ? "s" : ""
        } téléchargé${selectedFiles.length > 1 ? "s" : ""} avec succès.`,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      // Show error toast
      toast({
        variant: "destructive",
        title: "Erreur de téléchargement",
        description:
          "Une erreur s'est produite lors du téléchargement des fichiers.",
      });
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
              "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200",
              isDragging
                ? "border-primary bg-primary/5 scale-[0.99]"
                : "hover:border-primary/50",
              "cursor-pointer relative"
            )}
            onClick={() => document.getElementById("file-upload")?.click()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept={acceptedTypes}
              onChange={handleFileSelect}
            />
            <Paperclip
              className={cn(
                "h-8 w-8 mx-auto mb-2 transition-colors duration-200",
                isDragging ? "text-primary" : "text-muted-foreground"
              )}
            />
            <div className="space-y-1">
              <p
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isDragging ? "text-primary" : "text-foreground"
                )}
              >
                {isDragging
                  ? "Déposez les fichiers ici"
                  : "Glissez et déposez vos fichiers"}
              </p>
              <p className="text-sm text-muted-foreground">
                ou cliquez pour sélectionner
              </p>
            </div>
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
