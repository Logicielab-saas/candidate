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
import { ContractType } from "@/core/enums/contract-type.enum";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const jobTypeFormSchema = z.object({
  type: z.nativeEnum(ContractType, {
    required_error: "Le type de poste est requis",
  }),
});

type JobTypeFormValues = z.infer<typeof jobTypeFormSchema>;

interface EditJobTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, values: { type: ContractType }) => void;
  jobType: {
    id: string;
    type: ContractType;
  };
  selectedTypes: ContractType[];
}

export function EditJobTypeDialog({
  open,
  onOpenChange,
  onSubmit,
  jobType,
  selectedTypes,
}: EditJobTypeDialogProps) {
  const { toast } = useToast();
  const form = useForm<JobTypeFormValues>({
    resolver: zodResolver(jobTypeFormSchema),
    defaultValues: {
      type: jobType.type,
    },
  });

  const handleSubmit = (values: JobTypeFormValues) => {
    onSubmit(jobType.id, values);
    form.reset();
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Type de poste modifié",
      description: "Le type de poste a été modifié avec succès.",
    });
  };

  // Get available contract types (excluding already selected ones, but including current type)
  const availableTypes = Object.values(ContractType).filter(
    (type) => !selectedTypes.includes(type) || type === jobType.type
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[400px]">
        <ScrollArea className="px-6 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Modifier le type de poste</DialogTitle>
            <DialogDescription>
              Modifiez le type de poste sélectionné.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Type de poste <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de poste" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
            >
              Annuler
            </Button>
            <Button onClick={form.handleSubmit(handleSubmit)}>
              Enregistrer
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
