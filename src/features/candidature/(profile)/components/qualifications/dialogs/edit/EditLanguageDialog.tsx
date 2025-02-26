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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

const languageFormSchema = z.object({
  name: z.string().min(1, "Le nom de la langue est requis"),
  level: z.enum(["Basic", "Conversational", "Proficient", "Fluent"]),
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
      level: "Basic",
    },
  });

  // Update form when language changes
  useEffect(() => {
    if (language) {
      form.reset({
        name: language.name,
        level: language.level,
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
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[400px]">
        <ScrollArea className="px-6 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Modifier la langue</DialogTitle>
            <DialogDescription>
              Modifiez les informations de votre langue.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 px-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nom de la langue{" "}
                      <span className="text-destructive">*</span>
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
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niveau</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Conversational">
                            Conversational
                          </SelectItem>
                          <SelectItem value="Proficient">Proficient</SelectItem>
                          <SelectItem value="Fluent">Fluent</SelectItem>
                        </SelectContent>
                      </Select>
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
