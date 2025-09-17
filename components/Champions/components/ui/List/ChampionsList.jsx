import { ChampionCard } from "../../ChampionCard";

export const ChampionsList = ({
  championStats,
  latestPatch,
  getChampionName,
}) => (
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
);
