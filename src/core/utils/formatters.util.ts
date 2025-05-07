/**
 * formatAndCapitalize - Capitalizes the first letter of each word in a string and replaces underscores with spaces.
 *
 * This function takes a string, splits it by underscores, capitalizes the first letter of each part,
 * and joins them back together with spaces. If the string does not contain underscores, it simply
 * capitalizes the first letter of the string.
 *
 * @param input - The input string to format.
 * @returns The formatted string with capitalized words and spaces.
 */
export function formatAndCapitalize(input: string): string {
  if (!input) return "";

  return input
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
