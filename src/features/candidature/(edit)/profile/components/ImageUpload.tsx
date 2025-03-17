"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface ImageUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  initials: string;
  disabled?: boolean;
  existingImage?: string | null;
}

export function ImageUpload({
  value,
  onChange,
  initials,
  disabled,
  existingImage,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Use either the new uploaded file or fall back to existing image
  const imageUrl = value ? URL.createObjectURL(value) : existingImage || null;

  // Cleanup URL when component unmounts or when image changes
  useEffect(() => {
    return () => {
      if (imageUrl && value) {
        // Only revoke if it's a blob URL from a File
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, value]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Image size should be less than 5MB",
        });
        return;
      }

      // Check file type
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Only .jpg, .jpeg, .png and .gif formats are accepted",
        });
        return;
      }

      onChange(file);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  }

  function handleRemove() {
    // Just clear the new upload and fall back to existing image
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          {imageUrl ? (
            <AvatarImage src={imageUrl} alt="Profile picture" />
          ) : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 right-0 flex gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
          >
            <Camera className="h-4 w-4" />
          </Button>
          {value && ( // Only show remove button for new uploads
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleRemove}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        onChange={handleFileChange}
        disabled={disabled}
      />
    </div>
  );
}
