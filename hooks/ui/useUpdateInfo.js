import { formatDateEnglish } from "../../utils/dateFormatter";

/**
 * Hook to manage update information display
 */
export const useUpdateInfo = (playerData) => {
  /**
   * Get last update date from player data
   */
  const getLastUpdateDate = () => {
    if (playerData?.summoner?.updatedAt) {
      return formatDateEnglish(playerData.summoner.updatedAt);
    }

    return null;
  };

  return {
    getLastUpdateDate,
  };
};
