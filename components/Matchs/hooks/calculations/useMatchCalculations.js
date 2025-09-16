import { usePlayerStats } from "./usePlayerStats";
import { useMatchUtils } from "./useMatchUtils";

export const useMatchCalculations = () => {
  const playerStats = usePlayerStats();
  const matchUtils = useMatchUtils();

  // Combine all calculation functions
  return {
    ...playerStats,
    ...matchUtils,
  };
};
