/**
 * DocumentViewer - Component for displaying various document types
 *
 * Uses @cyntler/react-doc-viewer to render PDFs and other document types
 * with loading and error states
 */

"use client";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Loader2 } from "lucide-react";

interface DocumentViewerProps {
  url: string;
}

export function DocumentViewer({ url }: DocumentViewerProps) {
  const docs = [{ uri: url }];

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
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ),
          },
        }}
      />
    </div>
  );
}
