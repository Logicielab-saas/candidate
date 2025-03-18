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
import type { Skill } from "@/core/types/skill";
import { ScrollArea } from "@/components/ui/scroll-area";

const skillFormSchema = z.object({
  name: z.string().min(1, "Le nom de la compétence est requis"),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface AddSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Omit<Skill, "id">) => void;
}

export function AddSkillDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddSkillDialogProps) {
  const { toast } = useToast();
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (values: SkillFormValues) => {
    onSubmit(values);
    form.reset();
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Compétence ajoutée",
      description: "La compétence a été ajoutée avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[400px]">
        <ScrollArea className="px-3 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Ajouter une compétence</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle compétence à votre profil.
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
            <Button onClick={form.handleSubmit(handleSubmit)}>Ajouter</Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
