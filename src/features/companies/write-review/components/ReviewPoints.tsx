/**
 * ReviewPoints - Positive and negative points input component
 *
 * Allows users to add multiple positive and negative points about their experience.
 */

"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ReviewFormValues } from "../types";

interface ReviewPointsProps {
  form: UseFormReturn<ReviewFormValues>;
}

export function ReviewPoints({ form }: ReviewPointsProps) {
  const [positiveInput, setPositiveInput] = useState("");
  const [negativeInput, setNegativeInput] = useState("");

  const handleAddPoint = (
    type: "positivePoints" | "negativePoints",
    input: string,
    setInput: (value: string) => void
  ) => {
    if (!input.trim()) return;

    const currentPoints = form.getValues(type) || [];
    form.setValue(type, [...currentPoints, input.trim()]);
    setInput("");
  };

  const handleRemovePoint = (
    type: "positivePoints" | "negativePoints",
    index: number
  ) => {
    const currentPoints = form.getValues(type) || [];
    form.setValue(
      type,
      currentPoints.filter((_: string, i: number) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="positivePoints"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">
              Points positifs
            </FormLabel>
            <div className="text-sm text-muted-foreground mb-2">
              Qu&apos;avez-vous le plus apprécié en travaillant ici ?
              (Optionnel)
            </div>
            <FormControl>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={positiveInput}
                    onChange={(e) => setPositiveInput(e.target.value)}
                    placeholder="Ajouter un point positif..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddPoint(
                          "positivePoints",
                          positiveInput,
                          setPositiveInput
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleAddPoint(
                        "positivePoints",
                        positiveInput,
                        setPositiveInput
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {field.value?.map((point: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-secondary/50 p-2 rounded-md"
                    >
                      <span className="flex-1">{point}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleRemovePoint("positivePoints", index)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="negativePoints"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">
              Points à améliorer
            </FormLabel>
            <div className="text-sm text-muted-foreground mb-2">
              Que pourrait-on améliorer dans cette entreprise ? (Optionnel)
            </div>
            <FormControl>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={negativeInput}
                    onChange={(e) => setNegativeInput(e.target.value)}
                    placeholder="Ajouter un point à améliorer..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddPoint(
                          "negativePoints",
                          negativeInput,
                          setNegativeInput
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleAddPoint(
                        "negativePoints",
                        negativeInput,
                        setNegativeInput
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {field.value?.map((point: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-secondary/50 p-2 rounded-md"
                    >
                      <span className="flex-1">{point}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleRemovePoint("negativePoints", index)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
