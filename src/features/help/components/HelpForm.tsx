"use client";

import { useQueryState } from "nuqs";
import { SelectIssue } from "./SelectIssue";
import { MessageArea } from "./MessageArea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSendSupportTicket } from "../hooks/use-support-ticket";

export function HelpForm() {
  const t = useTranslations("help");
  const tCommon = useTranslations("common");
  const [issueType, setIssueType] = useQueryState("issue");
  const [message, setMessage] = useState("");

  const { mutate: sendTicket, isPending } = useSendSupportTicket(tCommon);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueType || !message.trim()) return;

    try {
      // TODO: Get the json dynamic data, support categories to set subject & category uuid from it
      sendTicket(
        {
          support_categorie_uuid: "1",
          subject: issueType,
          description: message,
        },
        {
          onSuccess: () => {
            // Reset form
            setMessage("");
            setIssueType(null);
          },
        }
      );
    } catch (_error) {
      // the hook already handle the toast error
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
            disabled={!issueType || !message.trim() || isPending}
          >
            {isPending ? t("form.sending") : t("form.submit")}
          </Button>
        </div>
      </form>
    </Card>
  );
}
