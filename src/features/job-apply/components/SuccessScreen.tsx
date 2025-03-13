/**
 * SuccessPage - Application submission success page
 *
 * Displays a success message and next steps after job application submission
 * Provides options to view other jobs or return to dashboard
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ClipboardList } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedCheckmark } from "@/components/ui/animated-checkmark";

export function SuccessScreen() {
  return (
    <div className="flex items-center justify-center">
      <div className="container max-w-2xl py-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-primary"
              >
                <AnimatedCheckmark size="xl" />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h1 className="text-2xl font-bold">Candidature envoyée !</h1>
                <p className="text-muted-foreground">
                  Votre candidature a été envoyée avec succès. Nous vous
                  contacterons dès que possible.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-muted/50 p-4 rounded-lg space-y-2 w-full max-w-md mt-4"
              >
                <h2 className="font-semibold">Prochaines étapes :</h2>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li>• Vous recevrez un email de confirmation</li>
                  <li>• Le recruteur examinera votre candidature</li>
                  <li>• Vous serez contacté pour la suite du processus</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mt-4"
              >
                <Button variant="outline" className="w-full sm:w-1/2" asChild>
                  <Link href="/home">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux offres
                  </Link>
                </Button>
                <Button className="w-full sm:w-1/2" asChild>
                  <Link href="/profile/my-jobs?tab=sent-applications">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Suivre mes candidatures
                  </Link>
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
