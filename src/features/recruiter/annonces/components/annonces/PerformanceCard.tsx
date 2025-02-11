import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PerformanceCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
}

export function PerformanceCard({
  icon: Icon,
  value,
  label,
}: PerformanceCardProps) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50 border border-secondaryHex-200 dark:border-secondaryHex-700 shadow-sm hover:shadow-md transition-all">
      <CardContent className="flex flex-col items-center gap-3 p-6">
        <div className={`rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-3`}>
          <Icon className={`w-6 h-6 text-primaryHex-600 dark:text-primaryHex-400`} />
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold text-secondaryHex-900 dark:text-secondaryHex-50">
            {value}
          </span>
          <span className="text-sm font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
            {label}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}