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

const SCHEDULE_TYPES = [
  { value: "fixed", label: "Heures fixes" },
  { value: "range", label: "Plage" },
  { value: "maximum", label: "Maximum" },
  { value: "minimum", label: "Minimum" },
] as const;

interface PartTimeDetailsProps {
  form: UseFormReturn<JobTypeForm>;
}

export function PartTimeDetails({ form }: PartTimeDetailsProps) {
  const handleScheduleTypeChange = (
    value: "fixed" | "range" | "maximum" | "minimum"
  ) => {
    console.log("Schedule Type Changed:", value);
    if (!form.getValues("partTimeDetails")) {
      form.setValue("partTimeDetails", {});
    }
    form.setValue("partTimeDetails.scheduleType", value);
  };

  const handleHoursChange = (value: string) => {
    console.log("Hours Changed:", value);
    if (!form.getValues("partTimeDetails")) {
      form.setValue("partTimeDetails", {});
    }
    form.setValue("partTimeDetails.hoursPerWeek", value);
  };

  return (
    <div className="space-y-4 pl-4 border-l-2 border-primaryHex-100">
      <FormField
        control={form.control}
        name="partTimeDetails.scheduleType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type d&apos;horaires</FormLabel>
            <Select
              onValueChange={handleScheduleTypeChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type d'horaires" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SCHEDULE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="partTimeDetails.hoursPerWeek"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Heures par semaine</FormLabel>
            <div className="flex items-center gap-2">
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Ex: 20"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    handleHoursChange(value);
                  }}
                  className="w-24"
                />
              </FormControl>
              <span className="text-sm text-muted-foreground">
                Heures par semaine
              </span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
