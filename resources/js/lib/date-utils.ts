const TURKISH_MONTHS = [
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
];

/**
 * Converts "2025-01" to "Oca 2025"
 */
export function formatMonthKey(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  const monthName = TURKISH_MONTHS[monthIndex] || month;
  return `${monthName} ${year}`;
}

/**
 * Converts "2025-01" to "Oca"
 */
export function formatMonthShort(monthKey: string): string {
  const [, month] = monthKey.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return TURKISH_MONTHS[monthIndex] || month;
}

/**
 * Formats "2025-02-15" to "15/02/2025"
 */
export function formatDateDisplay(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}
