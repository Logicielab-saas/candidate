/**
 * Language proficiency levels mapping and utilities
 */

export const LANGUAGE_PROFICIENCY = {
  1: "beginner",
  2: "conversational",
  3: "proficient",
  4: "fluent",
  5: "native",
} as const;

export type LanguageProficiencyLevel = keyof typeof LANGUAGE_PROFICIENCY;
export type LanguageProficiencyLabel =
  (typeof LANGUAGE_PROFICIENCY)[LanguageProficiencyLevel];

export function getProficiencyLabel(
  level: LanguageProficiencyLevel,
  t: (key: string) => string
): string {
  return t(`${LANGUAGE_PROFICIENCY[level]}`);
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
