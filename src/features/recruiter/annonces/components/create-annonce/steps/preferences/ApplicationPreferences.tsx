"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { PreferencesForm } from "@/features/recruiter/annonces/common";

interface ApplicationPreferencesProps {
  form: UseFormReturn<PreferencesForm>;
}

export function ApplicationPreferences({ form }: ApplicationPreferencesProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">
        Préférences en matière de candidature
      </h3>

      <div className="space-y-4">
        {/* Resume Required */}
        <FormField
          control={form.control}
          name="requireResume"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Le CV est requis pour postuler</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Allow Contact */}
        <FormField
          control={form.control}
          name="allowCandidateContact"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Autoriser les candidats potentiels à vous contacter par email
                  à propos de ce poste
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
