import { useState, useEffect, useCallback } from "react";
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ScrollArea } from "../ui/scroll-area";

export interface ImageLightboxProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: Array<{ src: string; alt: string }>;
  initialIndex?: number;
}

export function ImageLightbox({
  isOpen,
  onOpenChange,
  images,
  initialIndex = 0,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Translations
  const tCommon = useTranslations("common");

  const currentImage = images[currentIndex];

  // Reset states when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setScale(1);
      setRotation(0);
    }
    onOpenChange(open);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "+":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "r":
          handleRotate();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrevious]);

  if (!currentImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogHeader>
        <DialogTitle>{tCommon("aria.imageViewer")}</DialogTitle>
        <DialogDescription>
          {tCommon("aria.imageDescription")}
        </DialogDescription>
      </DialogHeader>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0">
        <ScrollArea className="h-[calc(100vh-200px)] max-h-[800px]">
          {/* Simple header with image count */}
          <div className="absolute top-2 left-4 right-4 z-50 flex justify-end mr-10">
            <div className="bg-background/80 rounded-lg px-2 py-1 text-sm">
              {tCommon("navigation.imageCount", {
                current: currentIndex + 1,
                total: images.length,
              })}
            </div>
          </div>

          {/* Main image area */}
          <div className="relative w-full h-full flex items-center justify-center bg-background/95">
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full z-50"
                  onClick={handlePrevious}
                  title={tCommon("actions.previous")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full z-50"
                  onClick={handleNext}
                  title={tCommon("actions.next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            <div className="relative w-full h-full p-4 overflow-auto">
              <div className="min-h-full min-w-full flex items-center justify-center">
                <div
                  className="relative transition-transform duration-200"
                  style={{
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                  }}
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={1200}
                    height={800}
                    className="object-contain max-w-none"
                    style={{
                      maxHeight: `calc(90vh - ${
                        images.length > 1 ? "200px" : "120px"
                      })`,
                      width: "auto",
                    }}
                    sizes="90vw"
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium truncate">
                {currentImage.alt}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleZoomOut}
                  title={tCommon("actions.zoomOut")}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleZoomIn}
                  title={tCommon("actions.zoomIn")}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleRotate}
                  title={tCommon("actions.rotate")}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                {images.length > 1 && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={handleNext}
                    title={tCommon("actions.next")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Thumbnails row */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2 px-1 -mx-1">
                {images.map((image, index) => (
                  <button
                    key={image.src}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors",
                      currentIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-primary/50"
                    )}
                    title={image.alt}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
