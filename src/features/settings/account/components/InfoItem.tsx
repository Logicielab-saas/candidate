import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface InfoItemProps {
  label: string;
  value: string;
  onChangeClick?: () => void;
  changeButton?: React.ReactNode;
  showChangeButton?: boolean;
}

export function InfoItem({
  label,
  value,
  onChangeClick,
  changeButton,
  showChangeButton = true,
}: InfoItemProps) {
  const tCommon = useTranslations("common");
  return (
    <div className="flex items-center justify-between py-4">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
      {showChangeButton &&
        (changeButton || (
          <Button variant="outline" size="sm" onClick={onChangeClick}>
            {tCommon("actions.change")}
          </Button>
        ))}
    </div>
  );
}
