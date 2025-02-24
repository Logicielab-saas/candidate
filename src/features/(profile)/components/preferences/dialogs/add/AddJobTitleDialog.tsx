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

const jobTitleFormSchema = z.object({
  title: z.string().min(1, "L'intitulé du poste est requis"),
});

type JobTitleFormValues = z.infer<typeof jobTitleFormSchema>;

interface AddJobTitleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: JobTitleFormValues) => void;
}

export function AddJobTitleDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddJobTitleDialogProps) {
  const { toast } = useToast();
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
      title: "Intitulé ajouté",
      description: "L'intitulé du poste a été ajouté avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Ajouter un intitulé de poste</DialogTitle>
          <DialogDescription>
            Ajoutez un nouvel intitulé de poste à votre profil.
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
                    <Input placeholder="Ex: Développeur Frontend" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
