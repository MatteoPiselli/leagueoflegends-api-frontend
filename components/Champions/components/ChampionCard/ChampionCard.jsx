import { ChampionInfo } from "./ChampionInfo";
import { ChampionStats } from "./ChampionStats";

export const ChampionCard = ({
  champion,
  latestPatch,
  getChampionName,
  getChampionId,
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-[#1e1e20] rounded-lg">
      <ChampionInfo
        champion={champion}
        latestPatch={latestPatch}
        getChampionName={getChampionName}
        getChampionId={getChampionId}
      />

      <ChampionStats champion={champion} />
    </div>
  );
};
