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
import { type Language } from "@/core/types/language";

const languageFormSchema = z.object({
  name: z.string().min(1, "Le nom de la langue est requis"),
  certification: z.string().optional(),
});

type LanguageFormValues = z.infer<typeof languageFormSchema>;

interface AddLanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Omit<Language, "id">) => void;
}

export function AddLanguageDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddLanguageDialogProps) {
  const { toast } = useToast();
  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      name: "",
      certification: "",
    },
  });

  const handleSubmit = (values: LanguageFormValues) => {
    onSubmit(values);
    form.reset();
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Langue ajoutée",
      description: "La langue a été ajoutée avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Ajouter une langue</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle langue à votre profil.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nom de la langue <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Anglais" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: TOEIC 945" {...field} />
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
