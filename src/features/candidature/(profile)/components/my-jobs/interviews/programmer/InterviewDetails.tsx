"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface InterviewDetailsProps {
  selectedDate: string | null;
  selectedHour: string | null;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  onModify: () => void;
}

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone number is required"),
});

export function InterviewDetails({
  selectedDate,
  selectedHour,
  candidateName,
  candidateEmail,
  candidatePhone,
  onModify,
}: InterviewDetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: candidateName,
      email: candidateEmail,
      phone: candidatePhone,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Submitted Data:", data);
    // You can add further logic here, like sending the data to an API
  };

  return (
    <div className="space-y-4">
      <div className="p-4 shadow rounded-lg mb-4 text-center">
        <h1 className="text-2xl font-bold">
          Voici vos détails d&apos;entretien
        </h1>
      </div>
      <Separator />
      <h2 className="text-xl font-semibold mb-2">Informations</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 shadow-md rounded-lg border"
      >
        <div>
          <label className="text-md text-gray-700">Prénom et nom:</label>
          <input
            {...register("name")}
            className="border rounded-md p-2 w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-md text-gray-700">Adresse email:</label>
          <input
            {...register("email")}
            className="border rounded-md p-2 w-full"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="text-md text-gray-700">Numéro de téléphone:</label>
          <input
            {...register("phone")}
            className="border rounded-md p-2 w-full"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <Separator />
        <h2 className="text-xl font-semibold mb-2">Entretien en personne</h2>
        <div className="p-6 shadow-md rounded-lg border">
          <div className="flex items-center mb-2">
            <CalendarIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
            <p className="text-md text-gray-700 dark:text-gray-300">
              Date: <span className="font-bold">{selectedDate}</span>
            </p>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
            <p className="text-md text-gray-700 dark:text-gray-300">
              Heure: <span className="font-bold">{selectedHour}</span>
            </p>
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Confirmer
        </Button>
      </form>
      <Button className="mt-2 w-full" onClick={onModify}>
        Modifier
      </Button>
    </div>
  );
}
