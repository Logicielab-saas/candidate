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
import { type JobTitle } from "../../JobTitleSection";
import { ScrollArea } from "@/components/ui/scroll-area";

const jobTitleFormSchema = z.object({
  title: z.string().min(1, "L'intitulé du poste est requis"),
});

type JobTitleFormValues = z.infer<typeof jobTitleFormSchema>;

interface EditJobTitleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, values: Omit<JobTitle, "id">) => void;
  jobTitle: JobTitle;
}

export function EditJobTitleDialog({
  open,
  onOpenChange,
  onSubmit,
  jobTitle,
}: EditJobTitleDialogProps) {
  const { toast } = useToast();
  const form = useForm<JobTitleFormValues>({
    resolver: zodResolver(jobTitleFormSchema),
    defaultValues: {
      title: jobTitle.title,
    },
  });

  const handleSubmit = (values: JobTitleFormValues) => {
    onSubmit(jobTitle.id, values);
    form.reset();
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Intitulé modifié",
      description: "L'intitulé du poste a été modifié avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[400px]">
        <ScrollArea className="px-3 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Modifier l&apos;intitulé de poste</DialogTitle>
            <DialogDescription>
              Modifiez l&apos;intitulé du poste sélectionné.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Intitulé du poste{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Développeur Frontend"
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
