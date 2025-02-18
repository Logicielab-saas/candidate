"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "../../../store/create-annonce-store";
import { useEffect } from "react";

const formSchema = z.object({
  jobTitle: z.string().min(1, "L'intitulé du poste est requis"),
  numberOfPeople: z.string().min(1, "Le nombre de personnes est requis"),
  promotionLocation: z.string().min(1, "Le lieu de promotion est requis"),
});

type BaseInformationForm = z.infer<typeof formSchema>;

const numberOfPeopleOptions = [
  { value: "1", label: "1 personne" },
  { value: "2-5", label: "2 à 5 personnes" },
  { value: "5-10", label: "5 à 10 personnes" },
  { value: "10+", label: "Plus de 10 personnes" },
];

const promotionLocationOptions = [
  { value: "national", label: "National" },
  { value: "regional", label: "Régional" },
  { value: "local", label: "Local" },
];

export function BaseInformationStep() {
  const { baseInformation, setBaseInformation } = useCreateAnnonceStore();

  const form = useForm<BaseInformationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: baseInformation,
  });

  // Update store when form values change
  const { watch } = form;
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.jobTitle && value.numberOfPeople && value.promotionLocation) {
        setBaseInformation(value as BaseInformationForm);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setBaseInformation]);

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intitulé du poste</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: Développeur Full Stack"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfPeople"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de personnes à recruter</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le nombre de personnes" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {numberOfPeopleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="promotionLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Où souhaitez-vous promouvoir cette offre d&apos;emploi ?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la zone de promotion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {promotionLocationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
      </CardContent>
    </Card>
  );
}
