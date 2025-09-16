import { useState, useEffect } from "react";

export const useChampionStats = (playerData) => {
  const [championStats, setChampionStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChampionStats = async () => {
    if (!playerData?.summoner?.puuid) return;

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
        setError(errorMessage);
        return;
      }

      const data = await response.json();
      setChampionStats(data.championStats || []);
    } catch (error) {
      console.error("Error fetching champion stats:", error);
      setError("Unable to load champion statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChampionStats();
  }, [playerData?.summoner?.puuid]);

  return {
    championStats,
    loading,
    error,
    refetch: fetchChampionStats,
  };
};
