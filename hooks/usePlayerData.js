import { usePlayerProfile } from "./ui/usePlayerProfile";
import { useRankedData } from "./data/useRankedData";
import { useMatchData } from "./data/useMatchData";
import { useMasteriesData } from "./data/useMasteriesData";
import { useChampionStats } from "./data/useChampionStats";

export const usePlayerData = () => {
  // Use specialized hooks
  const {
    playerData,
    isLoading,
    error,
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
  const {
    championStatsData,
    fetchChampionStatsData,
    retryChampionStats: retryChampionStatsData,
    setChampionStatsData,
  } = useChampionStats();

  // Orchestrate the search process
  const searchPlayer = async (username, tagline, forceUpdate = false) => {
    // Search player profile first
    const playerResult = await searchPlayerProfile(
      username,
      tagline,
      forceUpdate
    );

    if (playerResult && playerResult.summoner && playerResult.summoner.puuid) {
      const puuid = playerResult.summoner.puuid;

      // Fetch all related data in parallel
      await Promise.all([
        fetchRankedData(puuid, forceUpdate),
        fetchMatchData(puuid, forceUpdate),
        fetchMasteriesData(puuid, forceUpdate),
        fetchChampionStatsData(puuid, forceUpdate, "400"),
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

  const retryChampionStats = async () => {
    const puuid = playerData?.summoner?.puuid;
    if (puuid) {
      await retryChampionStatsData(puuid);
    }
  };

  return {
    playerData,
    rankedData,
    matchData,
    masteriesData,
    championStatsData,
    isLoading,
    error,
    searchPlayer,
    retryMatches,
    retryMasteries,
    retryChampionStats,
    fetchChampionStatsData,
    setPlayerData,
    setRankedData,
    setMatchData,
    setMasteriesData,
    setChampionStatsData,
  };
};
