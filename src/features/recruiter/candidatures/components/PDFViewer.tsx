"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

interface PDFViewerProps {
  url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const scale = 1.5;

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPDF();
  }, [url]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;
      } catch (error) {
        console.error("Error rendering page:", error);
      }
    };

    renderPage();
  }, [pdfDoc, currentPage]);

  const changePage = (delta: number) => {
    setCurrentPage((prev) => {
      const newPage = prev + delta;
      return newPage >= 1 && newPage <= numPages ? newPage : prev;
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Floating Navigation Bar */}
      <div className="sticky top-4 z-10 mb-4 flex items-center justify-between w-fit max-w-[400px] px-4 py-2 bg-background/80 backdrop-blur-md border rounded-full shadow-lg">
        <p>CV </p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changePage(-1)}
            disabled={currentPage <= 1}
            className="h-8 w-8 rounded-full hover:bg-accent disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-center text-sm">
            {currentPage}/{numPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changePage(1)}
            disabled={currentPage >= numPages}
            className="h-8 w-8 rounded-full hover:bg-accent disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-accent"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* PDF Content */}
      <div className="h-[calc(100vh-543px)] overflow-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent border border-border/40 rounded-lg p-4 mb-6">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  );
}
