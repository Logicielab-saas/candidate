import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface SelectIssueProps {
  value?: string;
  onValueChange: (value: string) => void;
}

export function SelectIssue({ value, onValueChange }: SelectIssueProps) {
  const t = useTranslations("help");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {t("selectIssue.label")}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("selectIssue.placeholder")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="technical">
            {t("selectIssue.options.technical")}
          </SelectItem>
          <SelectItem value="account">
            {t("selectIssue.options.account")}
          </SelectItem>
          <SelectItem value="billing">
            {t("selectIssue.options.billing")}
          </SelectItem>
          <SelectItem value="other">
            {t("selectIssue.options.other")}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
