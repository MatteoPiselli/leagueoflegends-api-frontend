// Utility functions for champion formatting and display

export const useChampionUtils = () => {
  // Function to get KDA color based on value
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

  // Function to get win rate color based on percentage
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

  return {
    getKdaColor,
    getWinRateColor,
  };
};
