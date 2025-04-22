"use client";

import type { Interview } from "@/core/interfaces/";
import { useTranslations } from "next-intl";

interface InterviewTypeDetailsProps {
  interview: Interview | undefined;
  className?: string;
}

export function InterviewTypeDetails({
  interview,
  className = "shadow-md p-4 rounded-lg bg-accent/20 border border-primaryHex-500",
}: InterviewTypeDetailsProps) {
  const tCommon = useTranslations("common");

  const interviewType = interview?.interviewType;
  const interviewDetails = {
    address: interview?.interviewAddress,
    link: interview?.interviewLink,
    phone: interview?.interviewPhone,
    map: interview?.interviewAddressMap,
  };

  return (
    <div className={className}>
      <p className="text-md text-gray-700 mb-4 font-semibold">
        {interviewType === "In-person" && (
          <>
            {tCommon("formatInterview")}{" "}
            <span className="text-primaryHex-500">{tCommon("inPerson")}</span>
          </>
        )}
        {interviewType === "Video Call" && (
          <>
            {tCommon("formatInterview")}{" "}
            <span className="text-primaryHex-500">{tCommon("videoCall")}</span>
          </>
        )}
        {interviewType === "Phone Call" && (
          <>
            {tCommon("formatInterview")}{" "}
            <span className="text-primaryHex-500">{tCommon("phoneCall")}</span>
          </>
        )}
      </p>
      {interviewType === "In-person" &&
        interviewDetails.address &&
        interviewDetails.map && (
          <>
            <p className="text-md text-gray-700 mb-2">
              {tCommon("labels.address")}:{" "}
              <span className="font-bold text-primaryHex-600">
                {interviewDetails.address}
              </span>
            </p>
            <p className="text-md text-gray-700 mb-2">
              {tCommon("map")}:{" "}
              <span className="font-bold text-primaryHex-600">
                {interviewDetails.map}
              </span>
            </p>
          </>
        )}
      {interviewType === "Video Call" && interviewDetails.link && (
        <p className="text-md text-gray-700 mb-4">
          {tCommon("videoLink")}:{" "}
          <span className="font-bold text-primaryHex-500">
            {interviewDetails.link}
          </span>
        </p>
      )}
      {interviewType === "Phone Call" && interviewDetails.phone && (
        <p className="text-md text-gray-700 mb-4">
          {tCommon("phone")}:{" "}
          <span className="font-bold text-primaryHex-500">
            {interviewDetails.phone}
          </span>
        </p>
      )}
    </div>
  );
}
