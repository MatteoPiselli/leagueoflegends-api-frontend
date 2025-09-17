import { useState, useEffect, useCallback } from "react";

export const useChampionStats = (playerData) => {
  const [championStats, setChampionStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChampionStats = useCallback(async () => {
    if (!playerData?.summoner?.puuid) {
      setChampionStats([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/matchs/champion-stats/${playerData.summoner.puuid}`
      );

      if (!response.ok) {
        let errorMessage;
        switch (response.status) {
          case 429:
            errorMessage = "Rate limit exceeded. Please wait 1-2 minutes.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = `Error loading champion stats (${response.status})`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setChampionStats(data.championStats || []);
      setError(null); // Clear any previous errors on success
    } catch (error) {
      console.error("Error fetching champion stats:", error);
      const errorMessage =
        error.message || "Unable to load champion statistics";
      setError(errorMessage);
      setChampionStats([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  }, [playerData?.summoner?.puuid]);

  useEffect(() => {
    fetchChampionStats();
  }, [fetchChampionStats]);

  return {
    championStats,
    loading,
    error,
    refetch: fetchChampionStats,
  };
};
