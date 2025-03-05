"use client";

import type { Interview } from "@/core/interfaces/";

interface InterviewTypeDetailsProps {
  interview: Interview | undefined;
  className?: string;
}

export function InterviewTypeDetails({
  interview,
  className = "shadow-md p-4 rounded-lg bg-accent/20 border border-primaryHex-500",
}: InterviewTypeDetailsProps) {
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
            Cette entretien se déroulera
            <span className="text-primaryHex-500"> en personne.</span>
          </>
        )}
        {interviewType === "Video Call" && (
          <>
            Cette entretien se déroulera par
            <span className="text-primaryHex-500"> appel vidéo.</span>
          </>
        )}
        {interviewType === "Phone Call" && (
          <>
            Cette entretien se déroulera par
            <span className="text-primaryHex-500"> téléphone.</span>
          </>
        )}
      </p>
      {interviewType === "In-person" &&
        interviewDetails.address &&
        interviewDetails.map && (
          <>
            <p className="text-md text-gray-700 mb-2">
              Adresse:{" "}
              <span className="font-bold text-primaryHex-600">
                {interviewDetails.address}
              </span>
            </p>
            <p className="text-md text-gray-700 mb-2">
              Map:{" "}
              <span className="font-bold text-primaryHex-600">
                {interviewDetails.map}
              </span>
            </p>
          </>
        )}
      {interviewType === "Video Call" && interviewDetails.link && (
        <p className="text-md text-gray-700 mb-4">
          Lien de l&apos;appel:{" "}
          <span className="font-bold text-primaryHex-500">
            {interviewDetails.link}
          </span>
        </p>
      )}
      {interviewType === "Phone Call" && interviewDetails.phone && (
        <p className="text-md text-gray-700 mb-4">
          Numéro de téléphone:{" "}
          <span className="font-bold text-primaryHex-500">
            {interviewDetails.phone}
          </span>
        </p>
      )}
    </div>
  );
}
