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
import { ContractDurationUnit, JobTypeForm } from "../../../../common";

const DURATION_UNITS = [
  { value: ContractDurationUnit.DAYS, label: "Jour(s)" },
  { value: ContractDurationUnit.WEEKS, label: "Semaine(s)" },
  { value: ContractDurationUnit.MONTHS, label: "Mois" },
] as const;

interface ContractDurationDetailsProps {
  form: UseFormReturn<JobTypeForm>;
  type: "interim" | "cdd";
  label?: string;
}

export function ContractDurationDetails({
  form,
  type,
  label = "Quelle est la durée du contrat ?",
}: ContractDurationDetailsProps) {
  const fieldName = type === "interim" ? "interimDetails" : "cddDetails";

  const handleDurationChange = (value: string) => {
    console.log(`${type} Duration Changed:`, value);
    form.setValue(`${fieldName}.duration`, value);
  };

  const handleUnitChange = (value: ContractDurationUnit) => {
    console.log(`${type} Unit Changed:`, value);
    form.setValue(`${fieldName}.unit`, value);
  };

  return (
    <div className="space-y-4 pl-4 border-l-2 border-primaryHex-100">
      <FormLabel>{label}</FormLabel>
      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name={`${fieldName}.duration`}
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
          name={`${fieldName}.unit`}
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
