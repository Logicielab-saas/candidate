import { Separator } from "@/components/ui/separator";
import { Interview } from "@/core/types/interview";
import { JobHeader } from "../jobHeader";

// TODO: Export the second section into a separate reusable component for reporter & refuser & programmer

const reasons = [
  "Cet emploi ne m'intéresse plus.",
  "J'ai accepté un autre poste.",
  "Le lieu de travail est trop éloigné.",
  "Le contenu est suspect.",
  "Autre",
];

export function InterviewAnnuler({
  interview,
}: {
  interview: Interview | undefined;
}) {
  const interviewType = interview?.interviewType; // e.g., "In-person", "Video Call", "Phone Call"

  const interviewDetails = {
    address: interview?.interviewAddress,
    link: interview?.interviewLink,
    phone: interview?.interviewPhone,
    map: interview?.interviewAddressMap,
  };
  return (
    <>
      <JobHeader
        jobTitle={interview?.jobTitle || ""}
        companyName={interview?.company.name || ""}
      />
      <Separator />
      {/*  interview */}
      <h2 className="text-xl font-semibold mb-2">Programmez votre entretien</h2>
      <div className="shadow-md p-4 rounded-lg bg-accent/20 border border-primaryHex-500">
        <p className="text-md text-gray-700 mb-4 font-semibold">
          {interviewType === "In-person" && (
            <>
              Cette entretien se déroulera
              <span className="text-primaryHex-500"> en personne.</span>
            </>
          )}
          {interviewType === "Video Call" && (
            <>
              Cette entretien se déroulera par &nbsp;
              <span className="text-primaryHex-500">appel vidéo</span>
            </>
          )}
          {interviewType === "Phone Call" && (
            <>
              Cette entretien se déroulera par téléphone.
              <span className="text-primaryHex-500">
                {interviewDetails.phone}
              </span>
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
            <span className="font-bold text-primaryHex-600">
              {interviewDetails.link}
            </span>
          </p>
        )}
        {interviewType === "Phone Call" && interviewDetails.phone && (
          <p className="text-md text-gray-700 mb-4">
            Numéro de téléphone:{" "}
            <span className="font-bold">{interviewDetails.phone}</span>
          </p>
        )}
      </div>
      <Separator />
    </>
  );
}
