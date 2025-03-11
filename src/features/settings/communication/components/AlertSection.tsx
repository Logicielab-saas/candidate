/**
 * AlertSection - A reusable section component for displaying alert settings
 *
 * A server component that renders a collapsible section for alert settings
 * with a title and children content.
 *
 * Props:
 * - title: string - The title of the alert section
 * - children: ReactNode - The content to be displayed when expanded
 */

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface AlertSectionProps {
  title: string;
  href: string;
}

export function AlertSection({ title, href }: AlertSectionProps) {
  return (
    <div className="rounded-lg border border-border p-4 mb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href={href} className="flex items-center gap-2">
            Gérer
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
