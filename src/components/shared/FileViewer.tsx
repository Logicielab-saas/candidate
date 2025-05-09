"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist";
import { ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleDownloadCV } from "@/core/utils/download-cv";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import LoaderOne from "@/components/ui/loader-one";

// Create a singleton worker instance
let pdfWorker: pdfjsLib.PDFWorker | undefined;

if (typeof window !== "undefined") {
  // Set worker source
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  // Create a single worker instance
  const createWorker = () => {
    if (!pdfWorker) {
      pdfWorker = new pdfjsLib.PDFWorker();
      // Add cleanup on page unload
      window.addEventListener("unload", () => {
        if (pdfWorker) {
          pdfWorker.destroy();
          pdfWorker = undefined;
        }
      });
    }
    return pdfWorker;
  };

  createWorker();
}

const CACHE_NAME = "pdf-viewer-cache-v1";

type FileType = "pdf" | "image" | "doc" | "unknown";

function getFileType(url: string): FileType {
  const extension = url.split(".").pop()?.toLowerCase() || "";

  if (extension === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) return "image";
  if (["doc", "docx"].includes(extension)) return "doc";
  return "unknown";
}

// Helper function to get cached PDF data
async function getCachedPDF(url: string): Promise<ArrayBuffer | null> {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(url);
    if (response) {
      return await response.arrayBuffer();
    }
    return null;
  } catch (error) {
    console.error("Cache error:", error);
    return null;
  }
}

// Helper function to cache PDF data
async function cachePDF(url: string, data: ArrayBuffer) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = new Response(data);
    await cache.put(url, response);
  } catch (error) {
    console.error("Cache error:", error);
  }
}

interface FileViewerProps {
  url: string;
}

export function FileViewer({ url }: FileViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<FileType>("unknown");
  const loadingTaskRef = useRef<pdfjsLib.PDFDocumentLoadingTask | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const scale = 1.5;

  useEffect(() => {
    setFileType(getFileType(url));
  }, [url]);

  // Cleanup function to handle PDF document cleanup
  const cleanup = () => {
    if (loadingTaskRef.current) {
      loadingTaskRef.current.destroy();
      loadingTaskRef.current = null;
    }
    if (pdfDoc) {
      pdfDoc.destroy();
      setPdfDoc(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadFile = async () => {
      try {
        setError(null);
        setIsLoading(true);
        cleanup(); // Clean up previous instances

        if (fileType === "doc") {
          setError(
            "This file type can only be opened with Microsoft Office or similar applications."
          );
          return;
        }

        if (fileType === "unknown") {
          setError(
            "This file type cannot be previewed. Please download to view."
          );
          return;
        }

        if (fileType === "pdf") {
          const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(url)}`;

          // Try to get cached PDF first
          const cachedData = await getCachedPDF(proxyUrl);

          let pdfData: ArrayBuffer;
          if (cachedData) {
            pdfData = cachedData;
          } else {
            // If not in cache, fetch through proxy and cache it
            const response = await fetch(proxyUrl);
            pdfData = await response.arrayBuffer();
            await cachePDF(proxyUrl, pdfData);
          }

          // Store the loading task reference for cleanup
          loadingTaskRef.current = pdfjsLib.getDocument({
            data: pdfData,
            worker: pdfWorker, // Use the singleton worker
          });

          const pdf = await loadingTaskRef.current.promise;

          if (isMounted) {
            setPdfDoc(pdf);
            setNumPages(pdf.numPages);
          }
        }
      } catch (error) {
        console.error("Error loading file:", error);
        setError("Failed to load file. Please try again.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFile();

    return () => {
      isMounted = false;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, fileType]);

  useEffect(() => {
    let isMounted = true;

    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        setIsPageLoading(true);
        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context || !isMounted) {
          page.cleanup();
          return;
        }

        // Clear previous content
        context.clearRect(0, 0, canvas.width, canvas.height);

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderTask = page.render({
          canvasContext: context,
          viewport,
        });

        await renderTask.promise;

        if (!isMounted) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }

        page.cleanup();
      } catch (error) {
        console.error("Error rendering page:", error);
      } finally {
        if (isMounted) {
          setIsPageLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      isMounted = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [pdfDoc, currentPage, scale]);

  const changePage = (delta: number) => {
    setCurrentPage((prev) => {
      const newPage = prev + delta;
      return newPage >= 1 && newPage <= numPages ? newPage : prev;
    });
  };

  if (error) {
    return (
      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
        <LoaderOne />
      </div>
    );
  }

  if (fileType === "image") {
    return (
      <div
        className="flex justify-center relative w-full"
        style={{ height: "70vh" }}
      >
        <Image
          src={url}
          alt="Preview"
          fill
          className="object-contain rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority
          quality={90}
          unoptimized={false}
        />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* PDF Content */}
      <div className="relative">
        <canvas ref={canvasRef} className="max-w-full" />
        {isPageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <LoaderOne />
          </div>
        )}
      </div>

      {/* Floating Navigation Bar */}
      {fileType === "pdf" && numPages > 1 && (
        <div className="sticky top-4 z-10 mb-4 flex items-center justify-between w-fit max-w-[400px] px-4 py-2 bg-background/80 dark:bg-background/90 backdrop-blur-md border border-border rounded-full shadow-lg">
          <p className="text-foreground">CV </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => changePage(-1)}
              disabled={currentPage <= 1 || isPageLoading}
              className="h-8 w-8 rounded-full hover:bg-accent disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-center text-sm text-foreground">
              {currentPage}/{numPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => changePage(1)}
              disabled={currentPage >= numPages || isPageLoading}
              className="h-8 w-8 rounded-full hover:bg-accent disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-accent"
            onClick={() => handleDownloadCV(url)}
            title="Download"
            disabled={isPageLoading}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
