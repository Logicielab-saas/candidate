/**
 * RemoteWorkFilter - Remote work toggle switch
 */

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { memo } from "react";

interface RemoteWorkFilterProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

function RemoteWorkFilterComponent({ value, onChange }: RemoteWorkFilterProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Remote Work</Label>
        <p className="text-sm text-muted-foreground">
          Show only remote positions
        </p>
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}

export const RemoteWorkFilter = memo(RemoteWorkFilterComponent);
