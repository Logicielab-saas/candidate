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
import { useTranslations } from "next-intl";
import { useMemo } from "react";

function minSalaryFormSchema(t: (key: string) => string) {
  return z.object({
    amount: z
      .string()
      .min(1, t("minSalary.amount.required"))
      .regex(SALARY_PATTERN, {
        message: t("minSalary.amount.invalid"),
      }),
    period: z.enum(["par mois", "par an"], {
      required_error: t("minSalary.period.required"),
    }),
  });
}

type MinSalaryFormValues = z.infer<ReturnType<typeof minSalaryFormSchema>>;

interface EditMinSalaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, values: Omit<MinSalary, "id">) => void;
  minSalary: MinSalary;
}

export default function EditMinSalaryDialog({
  open,
  onOpenChange,
  onSubmit,
  minSalary,
}: EditMinSalaryDialogProps) {
  const { toast } = useToast();
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("common.validation");

  const minSalaryForm = useMemo(
    () => minSalaryFormSchema(tValidation),
    [tValidation]
  );

  const form = useForm<MinSalaryFormValues>({
    resolver: zodResolver(minSalaryForm),
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
      title: tCommon("preferences.sections.minSalary.dialog.toast.edit.title"),
      description: tCommon(
        "preferences.sections.minSalary.dialog.toast.edit.description"
      ),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[500px]">
        <ScrollArea className="px-3 max-h-[90vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>
              {tCommon("preferences.sections.minSalary.dialog.edit.title")}
            </DialogTitle>
            <DialogDescription>
              {tCommon(
                "preferences.sections.minSalary.dialog.edit.description"
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2 rounded-md bg-blue-50 p-3 text-sm text-blue-900">
            <Info className="h-4 w-4" />
            <p>{tCommon("preferences.sections.minSalary.description")}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="px-3">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>
                        {tCommon(
                          "preferences.sections.minSalary.dialog.form.amount.label"
                        )}{" "}
                        <span className="text-destructive">
                          {tCommon("form.required")}
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder={tCommon(
                              "preferences.sections.minSalary.dialog.form.amount.placeholder"
                            )}
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (SALARY_PATTERN.test(value) || value === "") {
                                field.onChange(formatSalaryInput(value));
                              }
                            }}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            {tCommon(
                              "preferences.sections.minSalary.dialog.form.amount.currency"
                            )}
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
                        {tCommon(
                          "preferences.sections.minSalary.dialog.form.period.label"
                        )}{" "}
                        <span className="text-destructive">
                          {tCommon("form.required")}
                        </span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={tCommon(
                                "preferences.sections.minSalary.dialog.form.period.placeholder"
                              )}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="par mois">
                            {tCommon(
                              "preferences.sections.minSalary.periods.monthly"
                            )}
                          </SelectItem>
                          <SelectItem value="par an">
                            {tCommon(
                              "preferences.sections.minSalary.periods.yearly"
                            )}
                          </SelectItem>
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
              {tCommon("actions.cancel")}
            </Button>
            <Button onClick={form.handleSubmit(handleSubmit)}>
              {tCommon("actions.save")}
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
