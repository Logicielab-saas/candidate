/**
 * PrivacySection - Reusable section component for privacy settings
 *
 * Server component that renders a section with a title and content
 * for privacy-related information and settings.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface PrivacySectionProps {
  title: string;
  children: ReactNode;
}

export function PrivacySection({ title, children }: PrivacySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
