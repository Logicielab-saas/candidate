/**
 * ResumeUpload - Component for managing user's CV upload and download
 *
 * Features:
 * - Upload CV with drag and drop or file selection
 * - Preview uploaded CV
 * - Download existing CV
 * - Replace existing CV
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  FileUp,
  FileDown,
  File,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface ResumeFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface UploadState {
  status: "idle" | "uploading" | "success" | "error";
  message?: string;
}

export function ResumeUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
  });
  // Simulated existing CV - in real app, fetch from backend
  const [existingCV, setExistingCV] = useState<ResumeFile | null>({
    name: "mon_cv.pdf",
    size: 1024 * 1024 * 2.5, // 2.5MB
    type: "application/pdf",
    lastModified: Date.now(),
  });
  const { toast } = useToast();

  // Handle toast notifications based on upload state changes
  useEffect(() => {
    if (uploadState.status === "success") {
      toast({
        variant: "success",
        title: "CV téléchargé avec succès",
        description: "Votre CV a été mis à jour",
      });
    } else if (uploadState.status === "error") {
      toast({
        title: uploadState.message || "Erreur",
        description: "Une erreur est survenue lors du téléchargement",
        variant: "destructive",
      });
    }
  }, [uploadState, toast]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Validate file type
    if (!file.type.includes("pdf")) {
      setUploadState({
        status: "error",
        message: "Veuillez télécharger un fichier PDF",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadState({
        status: "error",
        message: "La taille maximale autorisée est de 5 Mo",
      });
      return;
    }

    // Simulate upload
    setIsUploading(true);
    setUploadProgress(0);
    setUploadState({ status: "uploading" });

    const simulateProgress = () => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          // Update existing CV
          setExistingCV({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
          });
          setUploadState({ status: "success" });
          return 100;
        }
        return prev + 5;
      });
    };

    const progressInterval = setInterval(simulateProgress, 100);
  };

  const handleDelete = () => {
    setExistingCV(null);
    setShowDeleteDialog(false);
    toast({
      title: "CV supprimé",
      description: "Votre CV a été supprimé avec succès",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Votre CV est en cours de téléchargement",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileUp className="h-6 w-6 text-primary" />
            Gérer votre CV
          </CardTitle>
          <CardDescription>
            Téléchargez votre CV pour postuler rapidement aux offres
            d&apos;emploi
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {existingCV ? (
            // Existing CV Display
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <File className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{existingCV.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(existingCV.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={handleDownload}
                  >
                    <FileDown className="h-4 w-4" />
                    Télécharger
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>CV prêt pour les candidatures</span>
              </div>
            </div>
          ) : (
            // Upload Area
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8",
                "flex flex-col items-center justify-center gap-4",
                "cursor-pointer transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25",
                isUploading && "pointer-events-none opacity-50"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">
                  Glissez-déposez votre CV ici ou{" "}
                  <label className="text-primary cursor-pointer hover:underline">
                    parcourez
                    <Input
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileSelect}
                    />
                  </label>
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF uniquement, 5 Mo maximum
                </p>
              </div>

              {isUploading && (
                <div className="w-full max-w-xs space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    Téléchargement en cours... {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tips Section */}
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              Conseils pour votre CV
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li>Utilisez un format clair et professionnel</li>
              <li>
                Mettez en avant vos réalisations plutôt que vos responsabilités
              </li>
              <li>Adaptez votre CV aux offres d&apos;emploi ciblées</li>
              <li>Vérifiez l&apos;orthographe et la grammaire</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le CV</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer votre CV ? Cette action est
              irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
