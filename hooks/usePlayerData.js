import { usePlayerProfile } from "./data/usePlayerProfile";
import { useRankedData } from "./data/useRankedData";
import { useMatchData } from "./data/useMatchData";
import { useMasteriesData } from "./data/useMasteriesData";

export const usePlayerData = () => {
  // Use specialized hooks
  const {
    playerData,
    isLoading,
    searchPlayer: searchPlayerProfile,
    setPlayerData,
  } = usePlayerProfile();
  const { rankedData, fetchRankedData, setRankedData } = useRankedData();
  const {
    matchData,
    fetchMatchData,
    retryMatches: retryMatchData,
    setMatchData,
  } = useMatchData();
  const {
    masteriesData,
    fetchMasteriesData,
    retryMasteries: retryMasteriesData,
    setMasteriesData,
  } = useMasteriesData();

  // Orchestrate the search process
  const searchPlayer = async (username, tagLine) => {
    // Search player profile first
    const playerResult = await searchPlayerProfile(username, tagLine);

    if (playerResult && playerResult.summoner && playerResult.summoner.puuid) {
      const puuid = playerResult.summoner.puuid;

      // Fetch all related data in parallel
      await Promise.all([
        fetchRankedData(puuid),
        fetchMatchData(puuid),
        fetchMasteriesData(puuid),
      ]);
    }

    return playerResult;
  };

  // Retry functions that use the current player's PUUID
  const retryMatches = async () => {
    const puuid = playerData?.summoner?.puuid;
    if (puuid) {
      await retryMatchData(puuid);
    }
  };

  const retryMasteries = async () => {
    const puuid = playerData?.summoner?.puuid;
    if (puuid) {
      await retryMasteriesData(puuid);
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
    retryMasteries,
    setPlayerData,
    setRankedData,
    setMatchData,
    setMasteriesData,
  };
};
