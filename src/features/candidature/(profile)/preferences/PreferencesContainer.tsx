"use client";

import { JobTitleSection } from "./JobTitleSection";
import { MinSalarySection } from "./MinSalarySection";
import { JobTypesSection } from "./JobTypesSection";
import { RelocationSection } from "./RelocationSection";
import { PreferenceSection } from "./PreferenceSection";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export function PreferencesContainer() {
  const [hasRelocation, setHasRelocation] = useState(false);
  const router = useRouter();
  const tCommon = useTranslations("common");

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {tCommon("actions.back")}
      </Button>
      <PreferenceSection
        title={tCommon("preferences.sections.jobTitles.title")}
      >
        <JobTitleSection />
      </PreferenceSection>

      <PreferenceSection
        title={tCommon("preferences.sections.minSalary.title")}
      >
        <MinSalarySection />
      </PreferenceSection>

      <PreferenceSection title={tCommon("preferences.sections.jobTypes.title")}>
        <JobTypesSection />
      </PreferenceSection>

      <PreferenceSection
        title={tCommon("preferences.sections.relocation.title")}
        showAddButton={!hasRelocation}
      >
        <RelocationSection onDataChange={setHasRelocation} />
      </PreferenceSection>
    </div>
  );
}
