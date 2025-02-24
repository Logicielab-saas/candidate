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
import { useEffect } from "react";

const languageFormSchema = z.object({
  name: z.string().min(1, "Le nom de la langue est requis"),
  certification: z.string().optional(),
});

type LanguageFormValues = z.infer<typeof languageFormSchema>;

interface EditLanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, values: Omit<Language, "id">) => void;
  language: Language;
}

export function EditLanguageDialog({
  open,
  onOpenChange,
  onSubmit,
  language,
}: EditLanguageDialogProps) {
  const { toast } = useToast();
  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      name: "",
      certification: "",
    },
  });

  // Update form when language changes
  useEffect(() => {
    if (language) {
      form.reset({
        name: language.name,
        certification: language.certification,
      });
    }
  }, [language, form]);

  const handleSubmit = (values: LanguageFormValues) => {
    onSubmit(language.id, values);
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Langue modifiée",
      description: "La langue a été modifiée avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Modifier la langue</DialogTitle>
          <DialogDescription>
            Modifiez les informations de votre langue.
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
          <Button onClick={form.handleSubmit(handleSubmit)}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
