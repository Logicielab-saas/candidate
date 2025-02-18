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
import { ContractScheduleType } from "../../../../common";
import { JobInformationForm } from "../../../../common/schemas/job-information.schema";

const SCHEDULE_TYPES = [
  { value: ContractScheduleType.FIXED, label: "Heures fixes" },
  { value: ContractScheduleType.RANGE, label: "Plage" },
  { value: ContractScheduleType.MAXIMUM, label: "Maximum" },
  { value: ContractScheduleType.MINIMUM, label: "Minimum" },
] as const;

interface PartTimeDetailsProps {
  form: UseFormReturn<JobInformationForm>;
}

export function PartTimeDetails({ form }: PartTimeDetailsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="partTimeDetails.scheduleType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type d&apos;horaire</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type d'horaire" />
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
            <FormControl>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Ex: 20"
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
