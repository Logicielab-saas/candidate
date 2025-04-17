"use client";

import { useQueryState } from "nuqs";
import { SelectIssue } from "./SelectIssue";
import { MessageArea } from "./MessageArea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";

export function HelpForm() {
  const t = useTranslations("help");
  const { toast } = useToast();
  const [issueType, setIssueType] = useQueryState("issue");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueType || !message.trim()) return;

    setIsSending(true);
    try {
      // TODO: Implement API call to send help request
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      console.log({ issueType, message });

      toast({
        variant: "success",
        title: t("toast.success.title"),
        description: t("toast.success.description"),
      });

      // Reset form
      setMessage("");
      setIssueType(null);
    } catch (error) {
      console.error("Failed to send help request:", error);
      toast({
        variant: "destructive",
        title: t("toast.error.title"),
        description: t("toast.error.description"),
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="p-6">
      <h4 className="tracking-tight text-lg font-medium mb-4">
        {t("form.title")}
      </h4>
      <form onSubmit={handleSubmit} className="space-y-8">
        <SelectIssue
          value={issueType ?? undefined}
          onValueChange={setIssueType}
        />
        <MessageArea
          value={message}
          onChange={setMessage}
          label={t("messageArea.label")}
          placeholder={t("messageArea.placeholder")}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!issueType || !message.trim() || isSending}
          >
            {isSending ? t("form.sending") : t("form.submit")}
          </Button>
        </div>
      </form>
    </Card>
  );
}
