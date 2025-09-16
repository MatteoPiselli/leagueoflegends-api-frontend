// Utility functions for champion stats calculations and formatting

/**
 * Calculate KDA color based on value
 * @param {number} kda - The KDA value
 * @returns {string} - Tailwind CSS color class
 */
export const useChampionCalculations = () => {
  const getKdaColor = (kda) => {
    switch (true) {
      case kda >= 5:
        return "text-orange-400";
      case kda >= 3:
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const getWinRateColor = (winRate) => {
    switch (true) {
      case winRate >= 60:
        return "text-orange-400";
      case winRate >= 50:
        return "text-blue-400";
      default:
        return "text-red-400";
    }
  };

  const formatChampionName = (championName) => {
    return championName?.replace(/([A-Z])/g, " $1").trim() || "";
  };

  return {
    getKdaColor,
    getWinRateColor,
    formatChampionName,
  };
};
