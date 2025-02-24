import { PDFViewer } from "./PDFViewer";

export function ResumeContainer() {
  return (
    <div className="flex flex-col gap-4">
      <PDFViewer url="/cvs/mycv.pdf" />
    </div>
  );
}
