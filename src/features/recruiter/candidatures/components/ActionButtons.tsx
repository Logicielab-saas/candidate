import { Check, HelpCircle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ActionButtons() {
  return (
    <>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="h-10 w-10 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-0 rounded-l-sm rounded-r-none"
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Préselectionées</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Préselectionées</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="h-10 w-10 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-none"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">À décider</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>À décider</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="h-10 w-10 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-r-sm rounded-l-none"
          >
            <Ban className="h-4 w-4" />
            <span className="sr-only">Ecarter</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ecarter</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
