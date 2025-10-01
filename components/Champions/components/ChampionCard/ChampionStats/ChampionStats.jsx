import { useChampionUtils } from "../../../hooks/utils";

export const ChampionStats = ({ champion }) => {
  const { getKdaColor, getWinRateColor } = useChampionUtils();

  return (
    <>
      <div className="flex flex-col items-center text-gray-400 w-20">
        {/* KDA */}
        <div
          className={`flex font-semibold text-sm space-x-1 ${getKdaColor(
            champion.averageStats.kda
          )}`}
        >
          <span>{champion.averageStats.kda}</span>
          <span>KDA</span>
        </div>
        {/* Detailed KDA */}
        <div className="text-xs">
          {champion.averageStats.kills} / {champion.averageStats.deaths} /{" "}
          {champion.averageStats.assists}
        </div>
      </div>

      <div className="flex flex-col items-end w-16">
        {/* Win Rate */}
        <div className="flex">
          <span
            className={`font-semibold text-sm ${getWinRateColor(
              champion.winRate
            )}`}
          >
            {champion.winRate}%
          </span>
        </div>

        {/* Games Played */}
        <div className="text-gray-400 text-xs">{champion.totalGames} games</div>
      </div>
    </>
  );
};
