import { useState } from "react";
import { handleHttpError } from "../../utils/errorHandling";

export const useMatchData = () => {
  const [matchData, setMatchData] = useState([]);

  // Fetch match details for multiple match IDs
  const fetchMatchDetails = async (matchIds) => {
    if (!Array.isArray(matchIds) || matchIds.length === 0) {
      return [];
    }

    const details = await Promise.all(
      matchIds.map(async (matchId) => {
        const res = await fetch(
          `http://localhost:3000/api/matchs/details/${matchId}`
        );
        return await res.json();
      })
    );

    return details;
  };

  // Fetch match data
  const fetchMatchData = async (puuid) => {
    if (!puuid) {
      setMatchData([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/matchs/${puuid}`);

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setMatchData([]);
        return;
      }

      const matches = await response.json();
      const matchIds = Array.isArray(matches.matchs) ? matches.matchs : [];
      const details = await fetchMatchDetails(matchIds);

      setMatchData(details);
    } catch (error) {
      console.error("Error fetching match data:", error);
      setMatchData([]);
    }
  };

  // Retry matches function
  const retryMatches = async (puuid) => {
    if (!puuid) {
      console.warn("No PUUID available for retry");
      return;
    }

    await fetchMatchData(puuid);
  };

  return {
    matchData,
    fetchMatchData,
    retryMatches,
    setMatchData,
  };
};
