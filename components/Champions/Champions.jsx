import { useEffect } from "react";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  ChampionsHeader,
  ChampionsList,
  RetryButton,
} from "./index";
import { usePlayerData } from "../../hooks/usePlayerData";

export default function Champions({
  playerData,
  latestPatch,
  getChampionName,
}) {
  const {
    championStatsData: championStats,
    retryChampionStats,
    isLoading,
    fetchChampionStatsData,
  } = usePlayerData();

  useEffect(() => {
    if (playerData?.summoner?.puuid && championStats?.length === 0) {
      fetchChampionStatsData(playerData.summoner.puuid);
    }
  }, [
    playerData?.summoner?.puuid,
    championStats?.length,
    fetchChampionStatsData,
  ]);

  const error = null;

  // States conditionals
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={retryChampionStats} />;

  return (
    <div className="h-fit w-full p-4 bg-[#19191B] rounded-lg">
      <ChampionsHeader />

      {championStats?.length === 0 ? (
        <EmptyState />
      ) : (
        <ChampionsList
          championStats={championStats}
          latestPatch={latestPatch}
          getChampionName={getChampionName}
        />
      )}

      {error && (
        <RetryButton
          onRefresh={retryChampionStats}
          loading={isLoading}
          disabled={isLoading}
        />
      )}
    </div>
  );
}
