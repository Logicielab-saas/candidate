"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { PreferencesForm } from "@/features/recruiter/annonces/common";

interface NotificationPreferencesProps {
  form: UseFormReturn<PreferencesForm>;
}

export function NotificationPreferences({
  form,
}: NotificationPreferencesProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "notificationEmails",
  });

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">
        Recevez des informations sur les candidatures
      </h3>

      {/* Email Addresses */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <FormField
              control={form.control}
              name={`notificationEmails.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Adresse email"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ value: "" })}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter une adresse email
        </Button>
      </div>

      {/* Notification Checkbox */}
      <FormField
        control={form.control}
        name="notifyOnNewApplication"
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
                Envoyer une notification par email à chaque nouvelle candidature
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
