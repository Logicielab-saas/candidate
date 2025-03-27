/**
 * AddJobTypeDialog - Dialog for adding job types to user preferences
 *
 * Allows users to select multiple job types from available options fetched from the API.
 * Handles selection and submission internally.
 *
 * Props:
 * - open: boolean - Controls dialog visibility
 * - onOpenChange: (open: boolean) => void - Handles dialog open state changes
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEmploiTypes } from "@/hooks/use-emploi-types";

const jobTypeFormSchema = z.object({
  types: z.array(z.string()).min(1, "Sélectionnez au moins un type de poste"),
});

type JobTypeFormValues = z.infer<typeof jobTypeFormSchema>;

interface AddJobTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddJobTypeDialog({
  open,
  onOpenChange,
}: AddJobTypeDialogProps) {
  const { data: emploiTypes, isLoading } = useEmploiTypes();
  const { toast } = useToast();

  const form = useForm<JobTypeFormValues>({
    resolver: zodResolver(jobTypeFormSchema),
    defaultValues: {
      types: [],
    },
  });

  const handleSubmit = (values: JobTypeFormValues) => {
    // Log selected job type UUIDs for now
    console.log("Selected job type UUIDs:", values.types);

    toast({
      variant: "success",
      title: "Types de poste ajoutés",
      description: "Les types de poste ont été ajoutés avec succès.",
    });

    form.reset();
    onOpenChange(false);
  };

  if (isLoading) {
    return null; // Or show a loading spinner
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[500px]">
        <ScrollArea className="px-3 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-xl">
              Ajouter des types de postes
            </DialogTitle>
            <DialogDescription className="text-base">
              Quels types de postes recherchez-vous ?
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="types"
                render={() => (
                  <FormItem className="space-y-4">
                    <div className="space-y-4">
                      {emploiTypes?.map((type) => (
                        <FormField
                          key={type.uuid}
                          control={form.control}
                          name="types"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={type.uuid}
                                className="flex items-center space-x-3 space-y-0 py-1"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(type.uuid)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            type.uuid,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== type.uuid
                                            )
                                          );
                                    }}
                                    className="h-6 w-6 rounded-[4px]"
                                  />
                                </FormControl>
                                <FormLabel className="text-base font-normal cursor-pointer">
                                  {type.title}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="text-base" />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter className="p-6 pt-4">
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
