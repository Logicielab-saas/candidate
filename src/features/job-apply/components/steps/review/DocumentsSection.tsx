/**
 * DocumentsSection - Review step documents section
 *
 * Displays uploaded documents and allows adding/removing documents
 * Supports files up to 5MB in size
 */

"use client";

import { FileText, Plus, Trash2, File, Image } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRef } from "react";
import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export function DocumentsSection() {
  const { documents, addDocument, removeDocument } = useJobApplyStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAddDocument = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        variant: "destructive",
        title: "Fichier trop volumineux",
        description: "La taille du fichier ne doit pas dépasser 5 Mo",
      });
      return;
    }

    // Create a URL for the file
    const fileURL = URL.createObjectURL(file);

    // Add new document to the store
    const newDocument = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: file.type,
      url: fileURL,
      size: file.size,
    };

    addDocument(newDocument);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast({
      variant: "success",
      title: "Document ajouté",
      description: "Le document a été ajouté avec succès",
    });
  };

  const handleDeleteDocument = (id: string) => {
    removeDocument(id);
    toast({
      variant: "success",
      title: "Document supprimé",
      description: "Le document a été supprimé avec succès",
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Documents</h3>
        </div>
        <span
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 hover:text-primaryHex-600 cursor-pointer"
          onClick={handleAddDocument}
        >
          <Plus className="h-5 w-5" />
        </span>
      </div>
      <Separator />

      {documents.length === 0 ? (
        <p className="text-muted-foreground italic">
          Aucun document supplémentaire
        </p>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(doc.type)}
                <div className="flex flex-col">
                  <span className="font-medium">{doc.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatFileSize(doc.size)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteDocument(doc.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*,.pdf,.doc,.docx"
      />
    </div>
  );
}
