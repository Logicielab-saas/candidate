/**
 * AddRelocationDialog - Dialog for adding relocation preferences
 *
 * Allows users to specify their relocation preferences including willingness to relocate
 * and preferred locations.
 *
 * Props:
 * - open: boolean - Controls dialog visibility
 * - onOpenChange: (open: boolean) => void - Handles dialog open state changes
 * - onSubmit: (values: RelocateFormValues) => void - Handles form submission
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

const relocateFormSchema = z.object({
  willRelocate: z.boolean(),
  locationType: z.enum(["anywhere", "specific"]),
  locations: z.array(z.string()).max(3),
});

type RelocateFormValues = z.infer<typeof relocateFormSchema>;

interface AddRelocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    values: Omit<RelocateFormValues, "locations"> & { location: string }
  ) => void;
}

export function AddRelocationDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddRelocationDialogProps) {
  const { toast } = useToast();
  const tCommon = useTranslations("common");
  const [locations, setLocations] = useState<string[]>([""]);

  const form = useForm<RelocateFormValues>({
    resolver: zodResolver(relocateFormSchema),
    defaultValues: {
      willRelocate: false,
      locationType: "anywhere",
      locations: [""],
    },
    context: {
      willRelocate: false,
      locationType: "anywhere",
    },
  });

  // Watch for changes in willRelocate and locationType to update validation context
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "willRelocate" || name === "locationType") {
        form.trigger("locations");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = (values: RelocateFormValues) => {
    // Validate that at least one location is provided when specific is selected
    if (values.willRelocate && values.locationType === "specific") {
      const hasValidLocation = values.locations.some(
        (loc) => loc.trim().length > 0
      );
      if (!hasValidLocation) {
        form.setError("locations", {
          message: "Veuillez ajouter au moins une ville",
        });
        return;
      }
    }

    const submitValues = {
      ...values,
      location:
        values.willRelocate && values.locationType === "specific"
          ? values.locations.filter(Boolean).join(",")
          : "",
    };
    onSubmit(submitValues);
    form.reset();
    setLocations([""]);
    onOpenChange(false);
    toast({
      variant: "success",
      title: tCommon("preferences.sections.relocation.dialog.toast.add.title"),
      description: tCommon(
        "preferences.sections.relocation.dialog.toast.add.description"
      ),
    });
  };

  const willRelocate = form.watch("willRelocate");
  const locationType = form.watch("locationType");

  const addLocation = () => {
    if (locations.length < 3) {
      setLocations([...locations, ""]);
      form.setValue("locations", [...form.getValues("locations"), ""]);
    }
  };

  const removeLocation = (index: number) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
    form.setValue("locations", newLocations);
  };

  const updateLocation = (index: number, value: string) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
    form.setValue("locations", newLocations);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[500px]">
        <ScrollArea className="px-3 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-xl">
              {tCommon("preferences.sections.relocation.dialog.add.title")}
            </DialogTitle>
            <DialogDescription className="text-base">
              {tCommon(
                "preferences.sections.relocation.dialog.add.description"
              )}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="px-3">
              <FormField
                control={form.control}
                name="willRelocate"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormControl>
                      <div className="items-top flex ml-3 space-x-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="willRelocate"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-6 w-6 rounded-[4px]"
                          />
                          <label
                            htmlFor="willRelocate"
                            className="text-base font-normal cursor-pointer"
                          >
                            {tCommon(
                              "preferences.sections.relocation.dialog.form.willRelocate.label"
                            )}
                          </label>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {willRelocate && (
                <FormField
                  control={form.control}
                  name="locationType"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-4 ml-9"
                        >
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem
                                value="anywhere"
                                className="h-6 w-6"
                                id="anywhere"
                              />
                            </FormControl>
                            <label
                              htmlFor="anywhere"
                              className="text-base font-normal cursor-pointer"
                            >
                              {tCommon(
                                "preferences.sections.relocation.dialog.form.locationType.options.anywhere"
                              )}
                            </label>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem
                                value="specific"
                                className="h-6 w-6"
                                id="specific"
                              />
                            </FormControl>
                            <label
                              htmlFor="specific"
                              className="text-base font-normal cursor-pointer"
                            >
                              {tCommon(
                                "preferences.sections.relocation.dialog.form.locationType.options.specific"
                              )}
                            </label>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {willRelocate && locationType === "specific" && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground ml-9">
                    {tCommon(
                      "preferences.sections.relocation.dialog.form.location.description"
                    )}
                  </p>
                  <FormField
                    control={form.control}
                    name="locations"
                    render={() => (
                      <FormItem>
                        <div className="space-y-2">
                          {locations.map((location, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 ml-9"
                            >
                              <Input
                                value={location}
                                onChange={(e) =>
                                  updateLocation(index, e.target.value)
                                }
                                className="text-base h-12"
                                placeholder={tCommon(
                                  "preferences.sections.relocation.dialog.form.location.placeholder"
                                )}
                              />
                              {locations.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-12 w-12"
                                  onClick={() => removeLocation(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <FormMessage className="ml-9 mt-2" />
                      </FormItem>
                    )}
                  />
                  {locations.length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-9"
                      onClick={addLocation}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {tCommon("actions.add")}
                    </Button>
                  )}
                </div>
              )}
            </form>
          </Form>

          <DialogFooter className="p-6 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-base"
            >
              {tCommon("actions.cancel")}
            </Button>
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              className="text-base"
            >
              {tCommon("actions.save")}
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
