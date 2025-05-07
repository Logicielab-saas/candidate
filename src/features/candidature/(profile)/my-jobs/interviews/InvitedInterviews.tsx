/**
 * InvitedInterviews - Displays interviews that the candidate has been invited to
 *
 * Shows a list of accepted interviews with their details and actions
 * Includes empty state handling when no interviews are present
 */
"use client";

import type { Interview } from "@/core/interfaces/";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Calendar, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/core/utils/date";
import { getInterviewLocation } from "@/core/utils/get-interview-location";

interface InvitedInterviewsProps {
  interviews: Interview[];
}

export function InvitedInterviews({ interviews }: InvitedInterviewsProps) {
  const t = useTranslations("myJobsPage.interviews");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <div>
      <div className="border border-primaryHex-500 p-4 rounded-lg shadow-md mb-4 relative">
        <h2 className="text-xl font-bold mb-4 relative z-10">
          {t("titleProgrammed")}
        </h2>
        <p className="text-md mb-4">{t("descriptionProgrammed")}</p>
      </div>
      <AnimatePresence>
        <div className="relative">
          {interviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6 text-muted-foreground"
            >
              {t("noInvitedInterviews")}
            </motion.div>
          ) : (
            <>
              <div className="absolute left-0 top-0 h-full border-l-4 border-dashed border-primaryHex-500 shadow-lg z-0"></div>
              {interviews.map((interview) => (
                <motion.div
                  key={interview.uuid}
                  className="flex justify-between items-center shadow rounded-lg p-4 mb-4 ml-4 dark:border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-1">
                    <Badge variant="default" className="mb-2">
                      {tCommon("programmed")}
                    </Badge>
                    <h3 className="text-lg font-semibold">
                      {interview.emploi_title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{interview.company_name}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{interview.city_name}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {formatDate(interview.date_inter, "PPP", locale)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-100">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {interview.time} {locale === "ar" ? "دقيقة" : "min"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-100">
                      <Zap className="h-4 w-4 mr-1" />
                      <span>
                        {getInterviewLocation(interview.type, tCommon)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2 ml-4">
                    <Button className="mb-2" asChild>
                      <Link href={`/interviews/programmer/${interview.uuid}`}>
                        {tCommon("actions.program")}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/interviews/refuser/${interview.uuid}`}>
                        {tCommon("actions.refuse")}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
