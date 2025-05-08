/**
 * PastInterviews - Displays completed interviews
 *
 * Shows a list of past interviews with their details
 * Includes empty state handling when no interviews are present
 */
"use client";

import type { Interview } from "@/core/interfaces/";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin, Calendar, Clock, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/core/utils/date";
import { getInterviewLocation } from "@/core/utils/get-interview-location";

interface PastInterviewsProps {
  interviews: Interview[];
}

export function PastInterviews({ interviews }: PastInterviewsProps) {
  const t = useTranslations("myJobsPage.interviews");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <div>
      <div className="border p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold mb-4">{t("titleCancelled")}</h2>
        <p className="text-md mb-4">{t("descriptionCancelled")}</p>
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
              {t("noCancelledInterviews")}
            </motion.div>
          ) : (
            <>
              <div className="absolute left-0 top-0 h-full border-l-4 border-dashed shadow-lg z-0"></div>
              {interviews.map((interview) => (
                <motion.div
                  key={interview.interview_uuid}
                  className="flex justify-between items-center shadow rounded-lg p-4 mb-4 ml-4 dark:border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-1">
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
                </motion.div>
              ))}
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
