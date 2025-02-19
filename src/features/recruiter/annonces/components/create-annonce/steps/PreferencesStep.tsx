"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "../../../store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { NotificationPreferences } from "./preferences/NotificationPreferences";
import { ApplicationPreferences } from "./preferences/ApplicationPreferences";
import { DeadlinePreferences } from "./preferences/DeadlinePreferences";
import {
  PreferencesForm,
  preferencesFormSchema,
} from "@/features/recruiter/annonces/common";

export function PreferencesStep() {
  const { preferences, setPreferences, previousStep, nextStep } =
    useCreateAnnonceStore();
  const { toast } = useToast();

  const form = useForm<PreferencesForm>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      notificationEmails: preferences?.notificationEmails || [{ value: "" }],
      notifyOnNewApplication: preferences?.notifyOnNewApplication || false,
      requireResume: preferences?.requireResume || false,
      allowCandidateContact: preferences?.allowCandidateContact || false,
      hasDeadline: preferences?.hasDeadline || false,
      deadline: preferences?.deadline || "",
    },
  });

  const onSubmit = (data: PreferencesForm) => {
    setPreferences(data);
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences ont été enregistrées avec succès.",
      variant: "success",
    });
    nextStep();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Préférences"
        description="Configurez vos préférences pour cette annonce"
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <NotificationPreferences form={form} />

              <Separator />

              <ApplicationPreferences form={form} />

              <Separator />

              <DeadlinePreferences form={form} />
            </form>
          </Form>
        </CardContent>
      </Card>

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={form.handleSubmit(onSubmit)}
        canProceed={!form.formState.isSubmitting}
        showPreview
      />
    </div>
  );
}
