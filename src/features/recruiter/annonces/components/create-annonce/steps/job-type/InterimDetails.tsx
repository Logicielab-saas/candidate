import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { JobTypeForm } from "./types";

const DURATION_UNITS = [
  { value: "days", label: "Jour(s)" },
  { value: "weeks", label: "Semaine(s)" },
  { value: "months", label: "Mois" },
] as const;

interface InterimDetailsProps {
  form: UseFormReturn<JobTypeForm>;
}

export function InterimDetails({ form }: InterimDetailsProps) {
  const handleDurationChange = (value: string) => {
    console.log("Duration Changed:", value);
    form.setValue("interimDetails.duration", value);
  };

  const handleUnitChange = (value: "days" | "weeks" | "months") => {
    console.log("Unit Changed:", value);
    form.setValue("interimDetails.unit", value);
  };

  return (
    <div className="space-y-4 pl-4 border-l-2 border-primaryHex-100">
      <FormLabel>Quelle est la durée du contrat ?</FormLabel>
      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="interimDetails.duration"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Ex: 3"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    handleDurationChange(value);
                  }}
                  className="w-24"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interimDetails.unit"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Select
                onValueChange={handleUnitChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez l'unité" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DURATION_UNITS.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
