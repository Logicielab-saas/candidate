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
import { type Skill } from "@/core/types/skill";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const skillFormSchema = z.object({
  name: z.string().min(1, "Le nom de la compétence est requis"),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface EditSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, values: Omit<Skill, "id">) => void;
  skill: Skill;
}

export function EditSkillDialog({
  open,
  onOpenChange,
  onSubmit,
  skill,
}: EditSkillDialogProps) {
  const { toast } = useToast();
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // Update form when skill changes
  useEffect(() => {
    if (skill) {
      form.reset({
        name: skill.name,
      });
    }
  }, [skill, form]);

  const handleSubmit = (values: SkillFormValues) => {
    onSubmit(skill.id, values);
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Compétence modifiée",
      description: "La compétence a été modifiée avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[400px]">
        <ScrollArea className="px-6 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Modifier la compétence</DialogTitle>
            <DialogDescription>
              Modifiez les informations de votre compétence.
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
                      Nom de la compétence{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: React.js" {...field} />
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
