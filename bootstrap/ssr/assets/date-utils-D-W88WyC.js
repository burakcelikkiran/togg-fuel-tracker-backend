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
  "Ara"
];
function formatMonthShort(monthKey) {
  const [, month] = monthKey.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return TURKISH_MONTHS[monthIndex] || month;
}
function formatDateDisplay(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}
export {
  formatMonthShort as a,
  formatDateDisplay as f
};
