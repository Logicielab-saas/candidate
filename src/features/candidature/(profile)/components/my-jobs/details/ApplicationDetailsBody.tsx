import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Job } from "@/core/types";
import { FileText } from "lucide-react";

interface ApplicationDetailsBodyProps {
  application: Job;
}

export function ApplicationDetailsBody({
  application,
}: ApplicationDetailsBodyProps) {
  return (
    <Card className="flex flex-col gap-2 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle>Détails de la candidature</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {/* Candidate Informations */}
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
          <h6 className="text-muted-foreground font-semibold">
            Contact Information
          </h6>
          <div className="flex gap-2">
            <span className="font-medium">Full Name:</span>
            <span>John Doe</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Email Address:</span>
            <span>john.doe@example.com</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">City, State:</span>
            <span>Tanger</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Phone Number:</span>
            <span>+212 6 12 34 56 78</span>
          </div>
        </div>

        {/* Candidature CV */}
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md flex flex-col items-start gap-2">
          <h6 className="text-muted-foreground font-semibold">CV</h6>
          <a
            href="/cvs/sample.pdf"
            download
            className="text-primaryHex-500 hover:bg-accent p-2 rounded-lg flex items-center gap-2"
          >
            <FileText className="h-5 w-5 text-primaryHex-600" />
            Bilal-Nnasser-fr.pdf
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
