/**
 * Format date to English short format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date (ex: "10/5 2:30 PM")
 */
export const formatDateEnglish = (date) => {
  if (!date) return null;

  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
