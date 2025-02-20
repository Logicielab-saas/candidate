"use client";

import { Button } from "@/components/ui/button";
import { Edit2, ChevronDown, ChevronUp } from "lucide-react";
import { ContractType } from "../../features/recruiter/annonces/common/enums/contract.enum";
import {
  SalaryDisplayType,
  SalaryFrequency,
} from "../../features/recruiter/annonces/common/enums/salary.enum";
import { CreateAnnonceState } from "../../features/recruiter/annonces/common/types/create-annonce.types";
import { FinalQuestion } from "../../features/recruiter/annonces/common/interfaces/questions.interface";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface JobPostDetailsProps {
  data: Pick<
    CreateAnnonceState,
    | "baseInformation"
    | "jobTypeInformation"
    | "salaryInformation"
    | "description"
    | "preferences"
    | "questions"
  >;
  onEdit?: (
    section:
      | "job-information"
      | "description-annonce"
      | "preferences"
      | "questions"
  ) => void;
  isEditable?: boolean;
}

const CONTRACT_TYPE_LABELS: Record<ContractType, string> = {
  [ContractType.FULL_TIME]: "Temps plein",
  [ContractType.PART_TIME]: "Temps partiel",
  [ContractType.CDI]: "CDI",
  [ContractType.INTERIM]: "Intérim",
  [ContractType.CDD]: "CDD",
  [ContractType.FREELANCE]: "Profession libérale",
  [ContractType.INTERNSHIP]: "Stage",
  [ContractType.APPRENTICESHIP]: "Apprentissage/Alternance",
};

const _SALARY_FREQUENCY_LABELS: Record<SalaryFrequency, string> = {
  [SalaryFrequency.HOURLY]: "par heure",
  [SalaryFrequency.DAILY]: "par jour",
  [SalaryFrequency.WEEKLY]: "par semaine",
  [SalaryFrequency.MONTHLY]: "par mois",
  [SalaryFrequency.YEARLY]: "par an",
};

interface DetailRowProps {
  label: string;
  value: string | React.ReactNode;
  onEdit?: () => void;
  isEditable?: boolean;
}

function DetailRow({
  label,
  value,
  onEdit,
  isEditable = true,
}: DetailRowProps) {
  return (
    <div className="flex items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex-1">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="mt-1 font-medium">{value}</div>
      </div>
      {isEditable && onEdit && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="ml-2 h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="bg-card rounded-lg border shadow-sm">{children}</div>
    </div>
  );
}

function DescriptionContent({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");
  const plainText = stripHtml(description);
  const isLong = plainText.length > 50;

  return (
    <div>
      <div
        className={cn(
          "prose prose-sm dark:prose-invert",
          !isExpanded && "line-clamp-2"
        )}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      {isLong && (
        <Button
          variant="link"
          className="px-0 text-sm flex items-center gap-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Masquer la description
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Afficher la description complète
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}

function QuestionContent({ question }: { question: FinalQuestion }) {
  const renderQuestionValue = () => {
    switch (question.type) {
      case "choice":
        return (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">Options :</p>
            <ul className="mt-1 space-y-1">
              {question.options?.map((option, i) => (
                <li key={i} className="text-sm ml-4">
                  • {option}
                </li>
              ))}
            </ul>
          </div>
        );
      case "experience":
        return (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              Expérience requise :
            </p>
            <p className="text-sm ml-4">{question.answer}</p>
          </div>
        );
      case "yesno":
      case "open":
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-sm">{question.question}</span>
        {!question.isRequired && (
          <span className="text-xs text-muted-foreground">(Facultatif)</span>
        )}
      </div>
      {renderQuestionValue()}
    </div>
  );
}

export function JobPostDetails({
  data,
  onEdit,
  isEditable = true,
}: JobPostDetailsProps) {
  const formatSalary = () => {
    const { displayType, minSalary, maxSalary } = data.salaryInformation;

    if (!displayType || (!minSalary && !maxSalary)) {
      return "Non spécifié";
    }

    if (displayType === SalaryDisplayType.RANGE) {
      if (!minSalary && !maxSalary) return "Non spécifié";
      if (minSalary && maxSalary) return `${minSalary}€ - ${maxSalary}€`;
      if (minSalary) return `À partir de ${minSalary}€`;
      if (maxSalary) return `Jusqu'à ${maxSalary}€`;
    }

    return "Non spécifié";
  };

  return (
    <div className="space-y-8">
      <Section title="Détails de l'emploi">
        <div className="p-4">
          <DetailRow
            label="Intitulé du poste"
            value={data.baseInformation.jobTitle}
            onEdit={() => onEdit?.("job-information")}
            isEditable={isEditable}
          />
          <DetailRow
            label="Nombre de postes"
            value={data.baseInformation.numberOfPeople}
            onEdit={() => onEdit?.("job-information")}
            isEditable={isEditable}
          />
          <DetailRow
            label="Lieu de promotion"
            value={data.baseInformation.promotionLocation}
            onEdit={() => onEdit?.("job-information")}
            isEditable={isEditable}
          />
          <DetailRow
            label="Type de poste"
            value={data.jobTypeInformation.contractTypes
              .map(
                (contractType) =>
                  CONTRACT_TYPE_LABELS[contractType as ContractType]
              )
              .join(", ")}
            onEdit={() => onEdit?.("job-information")}
            isEditable={isEditable}
          />
          <DetailRow
            label="Salaire"
            value={formatSalary()}
            onEdit={() => onEdit?.("job-information")}
            isEditable={isEditable}
          />
          <DetailRow
            label="Description du poste"
            value={<DescriptionContent description={data.description} />}
            onEdit={() => onEdit?.("description-annonce")}
            isEditable={isEditable}
          />
        </div>
      </Section>

      <Section title="Paramètres">
        <div className="p-4">
          <DetailRow
            label="Méthode de candidature"
            value={
              data.preferences?.notificationEmails[0]?.value || "Non spécifié"
            }
            onEdit={() => onEdit?.("preferences")}
            isEditable={isEditable}
          />
          <DetailRow
            label="Demande un CV"
            value={data.preferences?.requireResume ? "Oui" : "Non"}
            onEdit={() => onEdit?.("preferences")}
            isEditable={isEditable}
          />
          <DetailRow
            label="Autoriser les candidatures à me contacter"
            value={data.preferences?.allowCandidateContact ? "Oui" : "Non"}
            onEdit={() => onEdit?.("preferences")}
            isEditable={isEditable}
          />
          <DetailRow
            label="Notification pour nouvelles candidatures"
            value={data.preferences?.notifyOnNewApplication ? "Oui" : "Non"}
            onEdit={() => onEdit?.("preferences")}
            isEditable={isEditable}
          />
          <DetailRow
            label="Échéance de candidature"
            value={
              data.preferences?.hasDeadline && data.preferences.deadline
                ? new Date(data.preferences.deadline).toLocaleDateString(
                    "fr-FR"
                  )
                : "Non"
            }
            onEdit={() => onEdit?.("preferences")}
            isEditable={isEditable}
          />
        </div>
      </Section>

      {data.questions.length > 0 && (
        <Section title="Questions">
          <div className="p-4">
            {data.questions.map((question, index) => (
              <DetailRow
                key={question.id}
                label={`Question ${index + 1}`}
                value={<QuestionContent question={question as FinalQuestion} />}
                onEdit={() => onEdit?.("questions")}
                isEditable={isEditable}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
