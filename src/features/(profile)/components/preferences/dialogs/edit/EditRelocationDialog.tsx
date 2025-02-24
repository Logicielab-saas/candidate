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

const relocateFormSchema = z.object({
  willRelocate: z.boolean(),
  locationType: z.enum(["anywhere", "specific"]),
  locations: z.array(z.string()).max(3),
});

type RelocateFormValues = z.infer<typeof relocateFormSchema>;

interface EditRelocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    id: string,
    values: Omit<RelocateFormValues, "locations"> & { location: string }
  ) => void;
  relocation: {
    id: string;
    willRelocate: boolean;
    locationType: "anywhere" | "specific";
    location?: string;
  };
}

export function EditRelocationDialog({
  open,
  onOpenChange,
  onSubmit,
  relocation,
}: EditRelocationDialogProps) {
  const { toast } = useToast();
  const initialLocations = relocation.location
    ? relocation.location.split(",").map((loc) => loc.trim())
    : [""];
  const [locations, setLocations] = useState<string[]>(initialLocations);

  const form = useForm<RelocateFormValues>({
    resolver: zodResolver(relocateFormSchema),
    defaultValues: {
      willRelocate: relocation.willRelocate,
      locationType: relocation.locationType,
      locations: initialLocations,
    },
  });

  // Watch for changes in willRelocate and locationType to update validation
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
    onSubmit(relocation.id, submitValues);
    form.reset();
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Préférence de relocalisation modifiée",
      description:
        "Votre préférence de relocalisation a été modifiée avec succès.",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Modifier la relocalisation
          </DialogTitle>
          <DialogDescription className="text-base">
            Accepteriez-vous de déménager ?
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="willRelocate"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <div className="items-top flex space-x-3">
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
                          Oui, j&apos;accepterais de déménager
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
                            N&apos;importe où
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
                            Uniquement à proximité de...
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
                  Ajoutez jusqu&apos;à trois lieux.
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
                              placeholder="Ex: Tanger"
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
                    Ajouter un autre lieu
                  </Button>
                )}
              </div>
            )}
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-base"
          >
            Annuler
          </Button>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            className="text-base"
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
