import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmploisDetails } from "@/core/interfaces";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

interface AnnonceDescriptionProps {
  annonce: EmploisDetails;
}

export function AnnonceDescription({ annonce }: AnnonceDescriptionProps) {
  const sanitizedHTML = DOMPurify.sanitize(
    annonce.html_description ||
      annonce.description ||
      "Aucune description disponible"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Description du poste</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {parse(sanitizedHTML)}
        </div>
      </CardContent>
    </Card>
  );
}
