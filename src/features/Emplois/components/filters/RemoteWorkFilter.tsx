/**
 * RemoteWorkFilter - Remote work toggle switch
 */

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { memo } from "react";
import { useTranslations } from "next-intl";

interface RemoteWorkFilterProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

function RemoteWorkFilterComponent({ value, onChange }: RemoteWorkFilterProps) {
  const tCommon = useTranslations("common.filters.advanced.sections.remote");

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{tCommon("title")}</Label>
        <p className="text-sm text-muted-foreground">
          {tCommon("description")}
        </p>
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}

export const RemoteWorkFilter = memo(RemoteWorkFilterComponent);
