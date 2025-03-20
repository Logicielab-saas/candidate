/**
 * Skill proficiency levels mapping and utilities
 */

export const SKILL_PROFICIENCY = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
  4: "Expert",
  5: "Master",
} as const;

export type SkillProficiencyLevel = keyof typeof SKILL_PROFICIENCY;
export type SkillProficiencyLabel =
  (typeof SKILL_PROFICIENCY)[SkillProficiencyLevel];

export function getProficiencyLabel(
  level: SkillProficiencyLevel
): SkillProficiencyLabel {
  return SKILL_PROFICIENCY[level];
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
