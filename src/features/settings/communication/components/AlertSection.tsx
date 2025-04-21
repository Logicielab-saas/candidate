/**
 * AlertSection - A reusable section component for displaying alert settings
 *
 * A server component that renders a section for alert settings
 * with a title, description, and a link to manage the settings.
 * The entire section is clickable and navigates to the specified href.
 *
 * Props:
 * - title: string - The title of the alert section
 * - description: string - Optional description text for the alert section
 * - href: string - The link to the management page
 */

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface AlertSectionProps {
  title: string;
  description?: string;
  href: string;
}

export function AlertSection({ title, description, href }: AlertSectionProps) {
  const tCommon = useTranslations("common.actions");
  return (
    <Link
      href={href}
      className="block p-4 hover:bg-accent/50 transition-colors group"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground">
          {tCommon("manage")}
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
