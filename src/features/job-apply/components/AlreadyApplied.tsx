/**
 * AlreadyApplied - Component shown when user has already applied to a job
 *
 * Displays a friendly message with job details and a button to return to jobs list
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { EmploisDetails } from "@/core/interfaces";
import { AnimatedCheckmark } from "@/components/ui/animated-checkmark";
import { motion } from "framer-motion";

interface AlreadyAppliedProps {
  jobDetails: EmploisDetails;
}

export function AlreadyApplied({ jobDetails }: AlreadyAppliedProps) {
  const router = useRouter();

  return (
    <div className="container py-8 max-w-7xl">
      <Card className="w-full max-w-4xl mx-auto p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-primary"
          >
            <AnimatedCheckmark size="xl" />
          </motion.div>
          <h2 className="text-2xl font-semibold">Candidature déjà envoyée</h2>
          <p className="text-muted-foreground max-w-md">
            Vous avez déjà postulé pour le poste de{" "}
            <span className="font-medium text-primaryHex-700">
              {jobDetails.title}
            </span>
            {jobDetails.company_name && (
              <>
                {" "}
                chez{" "}
                <span className="font-medium text-primaryHex-700">
                  {jobDetails.company_name}
                </span>
              </>
            )}
            .
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/emplois")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux offres
          </Button>
        </div>
      </Card>
    </div>
  );
}
