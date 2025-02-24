import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface QualificationSectionProps {
  title: string;
  children: React.ReactNode;
}

export function QualificationSection({
  title,
  children,
}: QualificationSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => {
            const addButton = document.querySelector(
              `[data-section="${title}"] [data-add-button]`
            );
            if (addButton instanceof HTMLButtonElement) {
              addButton.click();
            }
          }}
        >
          <Plus className="mr-1" />
          Ajouter
        </Button>
      </div>
      <div data-section={title}>{children}</div>
    </section>
  );
}
