import {
  ChampionCard,
  LoadingState,
  ErrorState,
  EmptyState,
  useChampionStats,
} from "./ChampionStats";

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
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#dd1029]">
        <h2 className="text-base text-white font-semibold">Champions Stats</h2>
        <span className="text-xs text-gray-400">Top 3 recent</span>
      </div>

      {/* Content */}
      {championStats?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {championStats.map((champion) => (
            <ChampionCard
              key={champion.championId}
              champion={champion}
              latestPatch={latestPatch}
              getChampionName={getChampionName}
            />
          ))}
        </div>
      )}

      {/* Refresh Button - only show if there was an error */}
      {error && (
        <div className="mt-4 pt-3 border-t border-gray-700">
          <button
            onClick={refetch}
            disabled={loading}
            className="w-full py-2 px-4 bg-[#2a2a2e] text-gray-300 text-xs rounded hover:bg-[#35353a] transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Refresh Stats"}
          </button>
        </div>
      )}
    </div>
  );
}
