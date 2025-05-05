"use client";

import type { Interview } from "@/core/interfaces/";
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
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Define Zod schema for form validation
const formSchema = z.object({
  reason: z.string().nonempty("Please select a reason."),
  message: z.string().max(500, "Message must be 500 characters or less."),
});

type FormData = z.infer<typeof formSchema>;

interface InterviewRefuserProps {
  interview: Interview | undefined;
  source?: "annuler" | "refuser";
}

export function InterviewRefuser({
  interview,
  source = "refuser",
}: InterviewRefuserProps) {
  const t = useTranslations("myInterviewActionPage.refuser");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const { toast } = useToast();

  const reasons = [
    t("reasons.notInterested"),
    t("reasons.acceptedOther"),
    t("reasons.tooFar"),
    t("reasons.suspicious"),
    t("reasons.other"),
  ];

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
    console.log("Form Data:", data);
    // Here you would typically send the data to your server or API
    if (source === "annuler") {
      toast({
        variant: "success",
        title: t("toast.cancel.title"),
        description: t("toast.cancel.description"),
      });
    } else {
      toast({
        variant: "success",
        title: t("toast.refuse.title"),
        description: t("toast.refuse.description"),
      });
      router.replace(`/profile/my-jobs?tab=interviews`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <JobHeader
        jobTitle={interview?.jobTitle || ""}
        companyName={interview?.company.name || ""}
      />
      <Separator />
      <h2 className="text-xl font-semibold mb-2">
        {source === "annuler" ? t("title.cancel") : t("title.refuse")}
      </h2>

      <InterviewTypeDetails interview={interview} />

      <Separator />

      <div className="p-4 rounded-lg bg-accent/20 shadow">
        <h3 className="text-lg font-semibold mb-2">
          {t("reason.label")} <span className="text-red-500">*</span>
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
          <p className="text-red-500">{t("validation.reasonRequired")}</p>
        )}
      </div>
      <Separator />

      <div className="p-4 rounded-lg bg-accent/20 shadow">
        <h3 className="text-lg font-semibold mb-2">{t("message.label")}</h3>
        <Textarea
          {...register("message")}
          rows={4}
          maxLength={500}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder={t("message.placeholder")}
        />
        {errors.message && (
          <p className="text-red-500">{t("validation.messageMaxLength")}</p>
        )}
        <p className="text-sm text-gray-500">
          {t("message.counter", {
            current: watch("message")?.length || 0,
            max: 500,
          })}
        </p>
      </div>
      <Separator />

      <div className="flex space-x-4">
        <Button type="submit" className="w-full">
          {source === "annuler" ? t("actions.cancel") : t("actions.refuse")}
        </Button>
        {source === "refuser" ? (
          <Button className="w-full" variant="outline" asChild>
            <Link
              href={`/interviews/programmer/${interview?.jobKey}`}
              className="w-full"
            >
              {t("actions.maintain")}
            </Link>
          </Button>
        ) : (
          <Button className="w-full" variant="outline" asChild>
            <Link
              href={`/interviews/reporter/${interview?.jobKey}`}
              className="w-full"
            >
              {tCommon("suggestNewSlots")}
            </Link>
          </Button>
        )}
      </div>
    </form>
  );
}
