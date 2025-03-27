/**
 * AddJobTypeDialog - Responsive dialog/drawer for adding job types to user preferences
 *
 * Renders as a Dialog on desktop and Drawer on mobile.
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { useMediaQuery } from "@/hooks/use-media-query";
import LoaderOne from "@/components/ui/loader-one";

const jobTypeFormSchema = z.object({
  types: z.array(z.string()).min(1, "Sélectionnez au moins un type de poste"),
});

type JobTypeFormValues = z.infer<typeof jobTypeFormSchema>;

interface AddJobTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface JobTypeFormProps {
  form: ReturnType<typeof useForm<JobTypeFormValues>>;
}

function JobTypeForm({ form }: JobTypeFormProps) {
  const { data: emploiTypes, isLoading } = useEmploiTypes();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100px]">
        <LoaderOne />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                  render={({ field }) => (
                    <FormItem
                      key={type.uuid}
                      className="flex items-center space-x-3 space-y-0 py-1"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(type.uuid)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, type.uuid])
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
                  )}
                />
              ))}
            </div>
            <FormMessage className="text-base" />
          </FormItem>
        )}
      />
    </div>
  );
}

export default function AddJobTypeDialog({
  open,
  onOpenChange,
}: AddJobTypeDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();

  const form = useForm<JobTypeFormValues>({
    resolver: zodResolver(jobTypeFormSchema),
    defaultValues: {
      types: [],
    },
  });

  const onSubmit = (values: JobTypeFormValues) => {
    console.log("Selected job type UUIDs:", values.types);
    toast({
      variant: "success",
      title: "Types de poste ajoutés",
      description: "Les types de poste ont été ajoutés avec succès.",
    });
    form.reset();
    onOpenChange(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[85vh] p-0 sm:max-w-[500px] gap-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-xl">
              Ajouter des types de postes
            </DialogTitle>
            <DialogDescription className="text-base">
              Quels types de postes recherchez-vous ?
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="px-6 flex-1 h-full max-h-[50vh]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <JobTypeForm form={form} />
              </form>
            </Form>
          </ScrollArea>
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
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isValid}
              className="text-base"
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] flex flex-col">
        <DrawerHeader className="text-left px-4">
          <DrawerTitle className="text-xl">
            Ajouter des types de postes
          </DrawerTitle>
          <DrawerDescription className="text-base">
            Quels types de postes recherchez-vous ?
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[50vh] px-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <JobTypeForm form={form} />
              </form>
            </Form>
            <div className="h-4" />
          </ScrollArea>
        </div>
        <DrawerFooter className="mt-auto pt-2 px-4 border-t">
          <div className="flex flex-row-reverse sm:flex-row gap-3 w-full">
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isValid}
              className="flex-1 text-base"
            >
              Enregistrer
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="flex-1 text-base">
                Annuler
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
