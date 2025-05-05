/**
 * Skill proficiency levels mapping and utilities
 */

export const SKILL_PROFICIENCY = {
  1: "beginner",
  2: "intermediate",
  3: "advanced",
  4: "expert",
  5: "master",
} as const;

export type SkillProficiencyLevel = keyof typeof SKILL_PROFICIENCY;
export type SkillProficiencyLabel =
  (typeof SKILL_PROFICIENCY)[SkillProficiencyLevel];

export function getProficiencyLabel(
  level: SkillProficiencyLevel,
  t: (key: string) => string
): string {
  return t(`${SKILL_PROFICIENCY[level]}`);
}

export function isValidProficiencyLevel(
  level: number
): level is SkillProficiencyLevel {
  return level in SKILL_PROFICIENCY;
}

export const PROFICIENCY_OPTIONS = Object.entries(SKILL_PROFICIENCY).map(
  ([value, label]) => ({
    value: Number(value),
    label,
  })
);
