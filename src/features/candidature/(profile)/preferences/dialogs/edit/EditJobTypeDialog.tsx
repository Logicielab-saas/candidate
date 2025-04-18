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
import { ContractType } from "@/core/enums/contract-type.enum";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

function jobTypeFormSchema(t: (key: string) => string) {
  return z.object({
    type: z.nativeEnum(ContractType, {
      required_error: t("jobTypes.required"),
    }),
  });
}

type JobTypeFormValues = z.infer<ReturnType<typeof jobTypeFormSchema>>;

interface EditJobTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, values: { type: ContractType }) => void;
  jobType: {
    id: string;
    type: ContractType;
  };
  selectedTypes: ContractType[];
}

export default function EditJobTypeDialog({
  open,
  onOpenChange,
  onSubmit,
  jobType,
  selectedTypes,
}: EditJobTypeDialogProps) {
  const { toast } = useToast();
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("common.validation");

  const jobTypeForm = useMemo(
    () => jobTypeFormSchema(tValidation),
    [tValidation]
  );

  const form = useForm<JobTypeFormValues>({
    resolver: zodResolver(jobTypeForm),
    defaultValues: {
      type: jobType.type,
    },
  });

  const handleSubmit = (values: JobTypeFormValues) => {
    onSubmit(jobType.id, values);
    form.reset();
    onOpenChange(false);
    toast({
      variant: "success",
      title: tCommon("preferences.sections.jobTypes.dialog.toast.edit.title"),
      description: tCommon(
        "preferences.sections.jobTypes.dialog.toast.edit.description"
      ),
    });
  };

  // Get available contract types (excluding already selected ones, but including current type)
  const availableTypes = Object.values(ContractType).filter(
    (type) => !selectedTypes.includes(type) || type === jobType.type
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[400px]">
        <ScrollArea className="px-3 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>
              {tCommon("preferences.sections.jobTypes.dialog.edit.title")}
            </DialogTitle>
            <DialogDescription>
              {tCommon("preferences.sections.jobTypes.dialog.edit.description")}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="px-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tCommon(
                        "preferences.sections.jobTypes.dialog.form.type.label"
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
                              "preferences.sections.jobTypes.dialog.form.type.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
