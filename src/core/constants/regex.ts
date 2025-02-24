// Only allow numbers and dots for decimal places (e.g., 4.000, 40.000)
export const SALARY_PATTERN = /^[0-9.]*$/;

// Function to format salary input (adds dots for thousands)
export const formatSalaryInput = (value: string) => {
  // Remove any non-digit characters except dots
  const cleanValue = value.replace(/[^\d.]/g, '');

  // Split by dot to handle decimals
  const parts = cleanValue.split('.');

  // Format the whole number part with dots
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Join back with decimal part if it exists
  return parts.join('.');
};