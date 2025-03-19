/**
 * Language proficiency levels mapping and utilities
 */

export const LANGUAGE_PROFICIENCY = {
  1: "Basic",
  2: "Conversational",
  3: "Proficient",
  4: "Fluent",
  5: "Native",
} as const;

export type LanguageProficiencyLevel = keyof typeof LANGUAGE_PROFICIENCY;
export type LanguageProficiencyLabel =
  (typeof LANGUAGE_PROFICIENCY)[LanguageProficiencyLevel];

export function getProficiencyLabel(
  level: LanguageProficiencyLevel
): LanguageProficiencyLabel {
  return LANGUAGE_PROFICIENCY[level];
}

export function isValidProficiencyLevel(
  level: number
): level is LanguageProficiencyLevel {
  return level in LANGUAGE_PROFICIENCY;
}

export const PROFICIENCY_OPTIONS = Object.entries(LANGUAGE_PROFICIENCY).map(
  ([value, label]) => ({
    value: Number(value),
    label,
  })
);
