import {
  LoadingState,
  ErrorState,
  EmptyState,
  ChampionsHeader,
  ChampionsList,
  RefreshButton,
  useChampionStats,
} from "./index";

export default function Champions({
  playerData,
  latestPatch,
  getChampionName,
}) {
  const { championStats, loading, error, refetch } =
    useChampionStats(playerData);

  // States conditionals
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

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
        <RefreshButton
          onRefresh={refetch}
          loading={loading}
          disabled={loading}
        />
      )}
    </div>
  );
}
