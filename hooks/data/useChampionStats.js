import { useState } from "react";
import { handleHttpError } from "../../utils/errorHandling";

export const useChampionStats = () => {
  const [championStatsData, setChampionStatsData] = useState([]);

  // Fetch champion stats data
  const fetchChampionStatsData = async (puuid, forceUpdate = false) => {
    if (!puuid) {
      setChampionStatsData([]);
      return;
    }

    try {
      const url = new URL(`http://localhost:3000/api/champions/${puuid}/stats`);
      if (forceUpdate) {
        url.searchParams.set("updateClicked", "true");
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setChampionStatsData([]);
        return;
      }

      const championStats = await response.json();
      setChampionStatsData(championStats.championStats || []);
    } catch (error) {
      console.error("Error fetching champion stats data:", error);
      setChampionStatsData([]);
    }
  };

  // Retry champion stats function
  const retryChampionStats = async (puuid) => {
    if (!puuid) {
      console.warn("No PUUID available for retry");
      return;
    }

    await fetchChampionStatsData(puuid);
  };

  return {
    championStatsData,
    fetchChampionStatsData,
    retryChampionStats,
    setChampionStatsData,
  };
};
