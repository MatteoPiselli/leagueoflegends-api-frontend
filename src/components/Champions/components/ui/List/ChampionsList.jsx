import { ChampionCard } from "../../ChampionCard";

export const ChampionsList = ({
  championStats,
  latestPatch,
  getChampionName,
  getChampionId,
}) => (
  <div className="space-y-4">
    {championStats.map((champion) => (
      <ChampionCard
        key={champion.championId}
        champion={champion}
        latestPatch={latestPatch}
        getChampionName={getChampionName}
        getChampionId={getChampionId}
      />
    ))}
  </div>
);
