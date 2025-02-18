"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "../../../store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tiptap } from "@/components/ui/tiptap";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const descriptionFormSchema = z.object({
  description: z.string().min(1, "La description est requise"),
});

type DescriptionForm = z.infer<typeof descriptionFormSchema>;

export function DescriptionStep() {
  const { description, setDescription, previousStep, nextStep, canProceed } =
    useCreateAnnonceStore();
  const { toast } = useToast();

  const form = useForm<DescriptionForm>({
    resolver: zodResolver(descriptionFormSchema),
    defaultValues: {
      description: description,
    },
  });

  const onSubmit = (data: DescriptionForm) => {
    setDescription(data.description);
    toast({
      title: "Description enregistrée",
      description: "La description du poste a été enregistrée avec succès.",
      variant: "success",
    });
    nextStep();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Description du poste"
        description="Décrivez le poste et les compétences requises"
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description du poste</FormLabel>
                    <FormControl>
                      <Tiptap
                        description={field.value}
                        onChange={field.onChange}
                        placeholder="Décrivez le poste, les responsabilités, et les compétences requises..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={form.handleSubmit(onSubmit)}
        canProceed={canProceed()}
      />
    </div>
  );
}
