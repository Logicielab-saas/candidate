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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  jobTitle: z.string().min(1, "L'intitulé du poste est requis"),
  numberOfPeople: z.string().min(1, "Le nombre de personnes est requis"),
  promotionLocation: z.string().min(1, "La ville est requise"),
});

type BaseInformationForm = z.infer<typeof formSchema>;

const numberOfPeopleOptions = [
  { value: "1", label: "1 personne" },
  { value: "2-5", label: "2 à 5 personnes" },
  { value: "5-10", label: "5 à 10 personnes" },
  { value: "10+", label: "Plus de 10 personnes" },
];

const citiesByRegion = [
  {
    region: "Casablanca-Settat",
    cities: [
      { value: "casablanca", label: "Casablanca" },
      { value: "mohammedia", label: "Mohammedia" },
      { value: "el-jadida", label: "El Jadida" },
      { value: "settat", label: "Settat" },
    ],
  },
  {
    region: "Rabat-Salé-Kénitra",
    cities: [
      { value: "rabat", label: "Rabat" },
      { value: "sale", label: "Salé" },
      { value: "kenitra", label: "Kénitra" },
      { value: "temara", label: "Témara" },
    ],
  },
  {
    region: "Marrakech-Safi",
    cities: [
      { value: "marrakech", label: "Marrakech" },
      { value: "safi", label: "Safi" },
      { value: "essaouira", label: "Essaouira" },
    ],
  },
  {
    region: "Fès-Meknès",
    cities: [
      { value: "fes", label: "Fès" },
      { value: "meknes", label: "Meknès" },
      { value: "ifrane", label: "Ifrane" },
    ],
  },
  {
    region: "Tanger-Tétouan-Al Hoceïma",
    cities: [
      { value: "tanger", label: "Tanger" },
      { value: "tetouan", label: "Tétouan" },
      { value: "al-hoceima", label: "Al Hoceïma" },
    ],
  },
];

// Flatten cities array for easier search
const allCities = citiesByRegion.flatMap((region) =>
  region.cities.map((city) => ({
    ...city,
    region: region.region,
  }))
);

export function BaseInformationStep() {
  const { baseInformation, setBaseInformation } = useCreateAnnonceStore();
  const [openCity, setOpenCity] = useState(false);

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
                  <FormLabel>Ville de l&apos;offre d&apos;emploi</FormLabel>
                  <Popover open={openCity} onOpenChange={setOpenCity}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCity}
                          className="w-full justify-between"
                        >
                          {field.value
                            ? allCities.find(
                                (city) => city.value === field.value
                              )?.label
                            : "Sélectionnez une ville"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Rechercher une ville..." />
                        <CommandList>
                          <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
                          {citiesByRegion.map((region) => (
                            <CommandGroup
                              key={region.region}
                              heading={region.region}
                            >
                              {region.cities.map((city) => (
                                <CommandItem
                                  key={city.value}
                                  value={city.value}
                                  onSelect={(currentValue) => {
                                    form.setValue(
                                      "promotionLocation",
                                      currentValue
                                    );
                                    setOpenCity(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === city.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
