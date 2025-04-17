import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmploisDetails } from "@/core/interfaces";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { useTranslations } from "next-intl";

interface AnnonceDescriptionProps {
  annonce: EmploisDetails;
}

export function AnnonceDescription({ annonce }: AnnonceDescriptionProps) {
  const tCommon = useTranslations("common");

  const sanitizedHTML = DOMPurify.sanitize(
    annonce.html_description || annonce.description || tCommon("noDescription")
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tCommon("jobDescription")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {parse(sanitizedHTML)}
        </div>
      </CardContent>
    </Card>
  );
}
