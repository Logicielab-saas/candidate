import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Job, JobQuestion } from "@/core/types";
import { FileText } from "lucide-react";
import { JobQuestions } from "@/core/mockData/jobs";
import { Separator } from "@/components/ui/separator";

interface Document {
  id: number;
  name: string;
  type: string;
  url: string;
}

interface ApplicationDetailsBodyProps {
  application: Job;
}

// const { documents } = {
//   documents: [
//     {
//       id: 1,
//       name: "Cover Letter",
//       type: "cover-letter",
//       url: "/documents/cover-letter.pdf",
//     },
//   ],
// };

const { documents }: { documents: Document[] | null } = {
  documents: null,
};

export function ApplicationDetailsBody({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  application,
}: ApplicationDetailsBodyProps) {
  return (
    <Card className="flex flex-col gap-4 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Détails de la candidature
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Candidate Informations */}
        <div className="shadow dark:border p-4 rounded-lg shadow-md flex flex-col gap-4">
          <h6 className="text-muted-foreground font-semibold text-lg">
            Contact Information
          </h6>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">Full Name:</span>
              <span className="text-muted-foreground">John Doe</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Email Address:</span>
              <span className="text-muted-foreground">
                john.doe@example.com
              </span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">City, State:</span>
              <span className="text-muted-foreground">Tanger</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Phone Number:</span>
              <span className="text-muted-foreground">+212 6 12 34 56 78</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Candidature CV */}
        <div className="shadow dark:border p-4 rounded-lg shadow-md flex flex-col items-start gap-2">
          <h6 className="text-muted-foreground font-semibold">CV</h6>
          <a
            href="/cvs/sample.pdf"
            download
            className="text-primaryHex-500 hover:bg-accent p-2 rounded-lg flex items-center gap-2 transition duration-200"
          >
            <FileText className="h-5 w-5 text-primaryHex-600" />
            Bilal-Nnasser-fr.pdf
          </a>
        </div>

        <Separator />

        {/* Candidature Relevant Experience */}
        <div className="shadow dark:border p-4 rounded-lg shadow-md flex flex-col items-start gap-2">
          <h6 className="text-muted-foreground font-semibold">
            Relevant Experience
          </h6>
          <p className="text-base font-semibold">Front End Developer</p>
          <p className="text-base font-medium">Logiciel Lab</p>
        </div>

        <Separator />

        {/* Candidature Questions */}
        <div className="shadow dark:border p-4 rounded-lg shadow-md flex flex-col items-start gap-4">
          <h6 className="text-muted-foreground font-semibold text-lg">
            Questions
          </h6>
          {JobQuestions.length > 0 ? (
            JobQuestions.map((question: JobQuestion) => (
              <div
                key={question.id}
                className="bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow-sm w-full"
              >
                <p className="font-semibold text-md text-primaryHex-600">
                  {question.question}
                </p>
                <p className="text-base font-normal text-muted-foreground">
                  {question.answer}
                </p>
              </div>
            ))
          ) : (
            <p>No questions available</p>
          )}
        </div>

        <Separator />

        {/* Supporting Documents Cover Letter */}
        {documents ? (
          documents.map((document) => (
            <div
              key={document.id}
              className="shadow p-4 rounded-lg shadow-md flex flex-col items-start gap-2"
            >
              <h6 className="text-muted-foreground font-semibold">
                {document.name}
              </h6>
              <p>{document.name}</p>
            </div>
          ))
        ) : (
          <div className="shadow p-4 rounded-lg shadow-md flex flex-col items-start gap-2">
            <h6 className="text-muted-foreground font-semibold">
              Relevant Experience
            </h6>
            <p>No documents found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
