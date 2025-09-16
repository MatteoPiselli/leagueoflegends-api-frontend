import { useState } from "react";
import { handleHttpError } from "../utils/errorHandling";

export const usePlayerData = () => {
  const [playerData, setPlayerData] = useState(null);
  const [rankedData, setRankedData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [masteriesData, setMasteriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search player function
  const searchPlayer = async (username, tagLine) => {
    if (!username || !tagLine) {
      alert("Please enter a valid username and tag line.");
      return null;
    }

    setIsLoading(true);

    try {
      // Search player
      const response = await fetch(
        `http://localhost:3000/api/summoner/${username}/${tagLine}`
      );

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setPlayerData(null);
        return null;
      }

      const data = await response.json();

      // Check if response is valid
      if (data && data.summoner) {
        setPlayerData(data);

        // Fetch ranked data
        if (data.summoner && data.summoner.puuid) {
          const rankedResponse = await fetch(
            `http://localhost:3000/api/ranked/${data.summoner.puuid}`
          );
          const ranked = await rankedResponse.json();
          console.log("Ranked API Response:", ranked);

          // Transform ranked data to array format expected by frontend
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

          console.log("Transformed ranked array:", rankedArray);
          setRankedData(rankedArray);
        } else {
          setRankedData([]);
        }

        // Fetch matches data
        if (data.summoner && data.summoner.puuid) {
          const matchResponse = await fetch(
            `http://localhost:3000/matchs/${data.summoner.puuid}`
          );
          const matches = await matchResponse.json();

          // Fetch match details
          const details = await Promise.all(
            (Array.isArray(matches.matchs) ? matches.matchs : []).map(
              async (matchId) => {
                const res = await fetch(
                  `http://localhost:3000/matchs/details/${matchId}`
                );
                return await res.json();
              }
            )
          );
          setMatchData(details);
        } else {
          setMatchData([]);
        }

        // Fetch masteries data
        if (data.summoner && data.summoner.puuid) {
          const masteriesResponse = await fetch(
            `http://localhost:3000/api/masteries/${data.summoner.puuid}`
          );
          const masteries = await masteriesResponse.json();
          setMasteriesData(masteries.masteries);
        } else {
          setMasteriesData([]);
        }

        return data;
      } else {
        throw new Error("Player not found");
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
      setPlayerData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Retry matches function
  const retryMatches = async () => {
    if (!playerData?.summoner?.puuid) {
      console.warn("No player data available for retry");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/matchs/${playerData.summoner.puuid}`
      );

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setMatchData([]);
        return;
      }

      const matches = await response.json();

      const details = await Promise.all(
        (Array.isArray(matches.matchs) ? matches.matchs : []).map(
          async (matchId) => {
            const res = await fetch(
              `http://localhost:3000/matchs/details/${matchId}`
            );
            return await res.json();
          }
        )
      );
      setMatchData(details);
    } catch (error) {
      console.error("Error retrying match data:", error);
      setMatchData([]);
    }
  };

  return {
    playerData,
    rankedData,
    matchData,
    masteriesData,
    isLoading,
    searchPlayer,
    retryMatches,
    setPlayerData,
    setRankedData,
    setMatchData,
    setMasteriesData,
  };
};
