/**
 * ReviewJobDetails - Job position details input component
 *
 * Allows users to specify their job title and whether it's their current position
 */

"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { ReviewFormValues } from "../types";

interface ReviewJobDetailsProps {
  form: UseFormReturn<ReviewFormValues>;
}

export function ReviewJobDetails({ form }: ReviewJobDetailsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">
              Titre du poste <span className="text-destructive">*</span>
            </FormLabel>
            <div className="text-sm text-muted-foreground mb-2">
              Quel poste occupez-vous ou avez-vous occupé ?
            </div>
            <FormControl>
              <Input
                placeholder="Ex: Développeur Full Stack, Chef de Projet..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isCurrentJob"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Poste actuel</FormLabel>
              <div className="text-sm text-muted-foreground">
                Cochez si vous occupez actuellement ce poste
              </div>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
