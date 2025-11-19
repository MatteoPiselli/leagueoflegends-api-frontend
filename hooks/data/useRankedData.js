import { useState } from "react";
import { handleHttpError } from "../../utils/errorHandling";

export const useRankedData = () => {
  const [rankedData, setRankedData] = useState([]);

  // Transform ranked response to array format
  const transformRankedData = (ranked) => {
    const rankedArray = [];

    if (
      ranked.ranked &&
      ranked.ranked.soloDuo &&
      ranked.ranked.soloDuo.tier !== "Unranked"
    ) {
      rankedArray.push({
        queueType: "RANKED_SOLO_5x5",
        tier: ranked.ranked.soloDuo.tier,
        rank: ranked.ranked.soloDuo.rank,
        leaguePoints: ranked.ranked.soloDuo.lp,
        wins: ranked.ranked.soloDuo.wins,
        losses: ranked.ranked.soloDuo.losses,
      });
    }

    if (
      ranked.ranked &&
      ranked.ranked.flex &&
      ranked.ranked.flex.tier !== "Unranked"
    ) {
      rankedArray.push({
        queueType: "RANKED_FLEX_SR",
        tier: ranked.ranked.flex.tier,
        rank: ranked.ranked.flex.rank,
        leaguePoints: ranked.ranked.flex.lp,
        wins: ranked.ranked.flex.wins,
        losses: ranked.ranked.flex.losses,
      });
    }

    return rankedArray;
  };

  // Fetch ranked data
  const fetchRankedData = async (puuid, forceUpdate = false) => {
    if (!puuid) {
      setRankedData([]);
      return;
    }

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = new URL(`${API_URL}/api/ranked/${puuid}`);
      if (forceUpdate) {
        url.searchParams.set("updateClicked", "true");
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setRankedData([]);
        return;
      }

      const ranked = await response.json();
      const transformedData = transformRankedData(ranked);
      setRankedData(transformedData);
    } catch (error) {
      console.error("Error fetching ranked data:", error);
      setRankedData([]);
    }
  };

  return {
    rankedData,
    fetchRankedData,
    setRankedData,
  };
};
