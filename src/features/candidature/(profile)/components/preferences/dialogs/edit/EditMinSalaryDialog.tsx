"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
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
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";
import { type MinSalary } from "../../MinSalarySection";
import { SALARY_PATTERN, formatSalaryInput } from "@/core/constants/regex";
import { ScrollArea } from "@/components/ui/scroll-area";

const minSalaryFormSchema = z.object({
  amount: z.string().min(1, "Le montant est requis").regex(SALARY_PATTERN, {
    message: "Le montant doit être un nombre valide",
  }),
  period: z.enum(["par mois", "par an"], {
    required_error: "La période est requise",
  }),
});

type MinSalaryFormValues = z.infer<typeof minSalaryFormSchema>;

interface EditMinSalaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, values: Omit<MinSalary, "id">) => void;
  minSalary: MinSalary;
}

export function EditMinSalaryDialog({
  open,
  onOpenChange,
  onSubmit,
  minSalary,
}: EditMinSalaryDialogProps) {
  const { toast } = useToast();
  const form = useForm<MinSalaryFormValues>({
    resolver: zodResolver(minSalaryFormSchema),
    defaultValues: {
      amount: minSalary.amount,
      period: minSalary.period,
    },
  });

  const handleSubmit = (values: MinSalaryFormValues) => {
    onSubmit(minSalary.id, values);
    form.reset();
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Salaire minimum modifié",
      description: "Le salaire minimum a été modifié avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[500px]">
        <ScrollArea className="px-6 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Modifier le salaire minimum</DialogTitle>
            <DialogDescription>
              Quel salaire minimum recherchez-vous ?
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2 rounded-md bg-blue-50 p-3 text-sm text-blue-900">
            <Info className="h-4 w-4" />
            <p>Cette information ne sera pas communiquée aux employeurs.</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>
                        Salaire de base minimum{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="4.000"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (SALARY_PATTERN.test(value) || value === "") {
                                field.onChange(formatSalaryInput(value));
                              }
                            }}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            MAD
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>
                        Période de paie{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une période" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="par mois">par mois</SelectItem>
                          <SelectItem value="par an">par an</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>

          <DialogFooter className="p-6 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button onClick={form.handleSubmit(handleSubmit)}>
              Enregistrer
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
