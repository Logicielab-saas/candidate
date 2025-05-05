/**
 * DocumentViewer - Component for displaying various document types
 *
 * Uses @cyntler/react-doc-viewer to render PDFs and other document types
 * with loading and error states
 */

"use client";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import LoaderOne from "../ui/loader-one";

interface DocumentViewerProps {
  url: string;
}

export function DocumentViewer({ url }: DocumentViewerProps) {
  // Ensure the URL is absolute
  const absoluteUrl = url.startsWith("http")
    ? url
    : `https://${url.replace(/^\/+/, "")}`;

  // Create the proxy URL
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;

  const docs = [{ uri: proxyUrl }];

  return (
    <div className="w-full h-full">
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        theme={{
          primary: "var(--primary)",
          textPrimary: "hsl(var(--foreground))",
        }}
        style={{ height: "100%" }}
        config={{
          header: {
            disableHeader: true,
          },
          loadingRenderer: {
            overrideComponent: () => (
              <div className="flex items-center justify-center p-8">
                <LoaderOne />
              </div>
            ),
          },
          pdfZoom: {
            defaultZoom: 1.1, // slightly larger default zoom
            zoomJump: 0.2, // smoother zoom steps
          },
          pdfVerticalScrollByDefault: true, // enable vertical scrolling by default
        }}
      />
    </div>
  );
}
