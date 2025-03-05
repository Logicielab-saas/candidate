"use client";

import { Interview } from "@/core/interfaces/";
import { JobHeader } from "../jobHeader";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { InterviewTypeDetails } from "@/components/shared/InterviewTypeDetails";

// Define Zod schema for form validation
const formSchema = z.object({
  reason: z.string().nonempty("Please select a reason."),
  message: z.string().max(500, "Message must be 500 characters or less."),
});

// Define TypeScript type for form data
type FormData = z.infer<typeof formSchema>;

interface InterviewRefuserProps {
  interview: Interview | undefined;
  source?: "annuler" | "refuser";
}

const reasons = [
  "Cet emploi ne m'intéresse plus.",
  "J'ai accepté un autre poste.",
  "Le lieu de travail est trop éloigné.",
  "Le contenu est suspect.",
  "Autre",
];

export function InterviewRefuser({
  interview,
  source = "refuser",
}: InterviewRefuserProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Interview refused with data:", data);
    if (source === "annuler") {
      toast({
        variant: "success",
        title: "Entretien annulé",
        description: "L'entretien a été annulé avec succès",
      });
    } else {
      toast({
        variant: "success",
        title: "Entretien refusé",
        description: "L'entretien a été refusé avec succès",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Job details */}
      <JobHeader
        jobTitle={interview?.jobTitle || ""}
        companyName={interview?.company.name || ""}
      />
      <Separator />
      {/* Refuser/Annuler interview */}
      <h2 className="text-xl font-semibold mb-2">
        {source === "annuler" ? "Annuler l'entretien" : "Refuser l'entretien"}
      </h2>

      <InterviewTypeDetails interview={interview} />

      <Separator />

      {/* Reason selection section using shadcn/ui RadioGroup */}
      <div className="p-4 rounded-lg bg-accent/20 shadow">
        <h3 className="text-lg font-semibold mb-2">
          Sélectionnez un motif <span className="text-red-500">*</span>
        </h3>
        <RadioGroup
          {...register("reason")}
          onValueChange={(value) => setValue("reason", value)}
        >
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-center mb-2">
              <RadioGroupItem value={reason} id={`reason-${index}`} />
              <label
                htmlFor={`reason-${index}`}
                className="text-md text-gray-700 dark:text-gray-300 ml-2"
              >
                {reason}
              </label>
            </div>
          ))}
        </RadioGroup>
        {errors.reason && (
          <p className="text-red-500">{errors.reason.message}</p>
        )}
      </div>
      <Separator />

      {/* Message section using shadcn/ui Textarea */}
      <div className="p-4 rounded-lg bg-accent/20 shadow">
        <h3 className="text-lg font-semibold mb-2">
          Ajouter un message pour l&apos;employeur (optionnel)
        </h3>
        <Textarea
          {...register("message")}
          rows={4}
          maxLength={500}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Votre message ici..."
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}
        <p className="text-sm text-gray-500">{watch("message")?.length}/500</p>
      </div>
      <Separator />

      {/* Action buttons */}
      <div className="flex space-x-4">
        <Button type="submit" className="w-full">
          {source === "annuler" ? "Annuler l'entretien" : "Refuser l'entretien"}
        </Button>
        {source === "refuser" ? (
          <Button className="w-full" variant="outline" asChild>
            <Link
              href={`/interviews/programmer/${interview?.jobKey}`}
              className="w-full"
            >
              Maintenir cet entretien
            </Link>
          </Button>
        ) : (
          <Button className="w-full" variant="outline" asChild>
            <Link
              href={`/interviews/reporter/${interview?.jobKey}`}
              className="w-full"
            >
              Suggérer un nouveau créneau
            </Link>
          </Button>
        )}
      </div>
    </form>
  );
}
