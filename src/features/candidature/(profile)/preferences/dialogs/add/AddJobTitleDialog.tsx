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
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

interface AddJobTitleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: { title: string }) => void;
}

export default function AddJobTitleDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddJobTitleDialogProps) {
  const { toast } = useToast();
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("common.validation");

  const jobTitleFormSchema = z.object({
    title: z.string().min(1, tValidation("jobTitle.required")),
  });

  type JobTitleFormValues = z.infer<typeof jobTitleFormSchema>;

  const form = useForm<JobTitleFormValues>({
    resolver: zodResolver(jobTitleFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSubmit = (values: JobTitleFormValues) => {
    onSubmit(values);
    form.reset();
    onOpenChange(false);
    toast({
      variant: "success",
      title: tCommon(
        "preferences.sections.jobTitles.dialog.add.toast.success.title"
      ),
      description: tCommon(
        "preferences.sections.jobTitles.dialog.add.toast.success.description"
      ),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[400px]">
        <ScrollArea className="px-3 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>
              {tCommon("preferences.sections.jobTitles.dialog.add.title")}
            </DialogTitle>
            <DialogDescription>
              {tCommon("preferences.sections.jobTitles.dialog.add.description")}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="px-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tCommon(
                        "preferences.sections.jobTitles.dialog.add.form.label"
                      )}{" "}
                      <span className="text-destructive">
                        {tCommon("form.required")}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={tCommon(
                          "preferences.sections.jobTitles.dialog.add.form.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
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
              {tCommon("actions.create")}
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
