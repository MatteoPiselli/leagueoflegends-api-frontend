import { useEffect, useState } from "react";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  ChampionsHeader,
  ChampionsList,
  RetryButton,
  QueueTypeSelector,
} from "./index";
import { usePlayerData } from "../../hooks/usePlayerData";
import { useChampion } from "../../contexts/ChampionContext";

export default function Champions({ playerData }) {
  const { latestPatch, getChampionName, getChampionId } = useChampion();
  const {
    championStatsData: championStats,
    retryChampionStats,
    isLoading,
    fetchChampionStatsData,
  } = usePlayerData();

  const [selectedQueueType, setSelectedQueueType] = useState("400");

  useEffect(() => {
    if (playerData?.summoner?.puuid) {
      fetchChampionStatsData(
        playerData.summoner.puuid,
        false,
        selectedQueueType
      );
    }
  }, [playerData?.summoner?.puuid, selectedQueueType]);

  // Handle queue type change
  const handleQueueTypeChange = (queueType) => {
    setSelectedQueueType(queueType);
  };

  const error = null;

  // States conditionals
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={retryChampionStats} />;

  return (
    <div className="h-fit w-full p-4 bg-[#19191B] rounded-lg">
      <ChampionsHeader />

      <QueueTypeSelector
        selectedQueueType={selectedQueueType}
        onQueueTypeChange={handleQueueTypeChange}
      />

      {championStats.length < 1 ? (
        <EmptyState />
      ) : (
        <ChampionsList
          championStats={championStats}
          latestPatch={latestPatch}
          getChampionName={getChampionName}
          getChampionId={getChampionId}
        />
      )}

      {error && (
        <RetryButton
          onRefresh={() =>
            retryChampionStats(playerData?.summoner?.puuid, selectedQueueType)
          }
          loading={isLoading}
          disabled={isLoading}
        />
      )}
    </div>
  );
}
