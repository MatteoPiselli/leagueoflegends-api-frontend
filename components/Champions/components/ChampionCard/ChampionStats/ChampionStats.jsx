import { useChampionUtils } from "../../../hooks/utils";

export const ChampionStats = ({ champion }) => {
  const { getKdaColor, getWinRateColor } = useChampionUtils();

  return (
    <div className="flex flex-col items-end space-y-1">
      {/* KDA */}
      <div className="flex items-center space-x-2">
        <span
          className={`font-semibold text-sm ${getKdaColor(
            champion.averageStats.kda
          )}`}
        >
          {champion.averageStats.kda}
        </span>
        <span className="text-gray-400 text-xs">KDA</span>
      </div>

      {/* Win Rate */}
      <div className="flex items-center space-x-2">
        <span
          className={`font-semibold text-sm ${getWinRateColor(
            champion.winRate
          )}`}
        >
          {champion.winRate}%
        </span>
        <span className="text-gray-400 text-xs">WR</span>
      </div>

      {/* Detailed KDA */}
      <div className="text-gray-400 text-xs">
        {champion.averageStats.kills} / {champion.averageStats.deaths} /{" "}
        {champion.averageStats.assists}
      </div>

      {/* CS */}
      <div className="text-gray-400 text-xs">{champion.averageStats.cs} CS</div>
    </div>
  );
};
