import Image from "next/image";
import { useChampionCalculations } from "../../hooks/calculations";

export const ChampionCard = ({ champion, latestPatch, getChampionName }) => {
  const { getKdaColor, getWinRateColor } = useChampionCalculations();

  return (
    <div className="flex items-center justify-between p-3 bg-[#1e1e20] rounded-lg">
      {/* -------- Champion Info -------- */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${getChampionName(
              champion.championId
            )}.png`}
            alt={champion.championName}
            width={48}
            height={48}
            className="scale-[1.2]"
          />
        </div>
        <div>
          <h3 className="text-white font-medium text-sm">
            {champion.championName}
          </h3>
          <p className="text-gray-400 text-xs">{champion.games} games</p>
        </div>
      </div>

      {/* -------- Stats -------- */}
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
        <div className="text-gray-400 text-xs">
          {champion.averageStats.cs} CS
        </div>
      </div>
    </div>
  );
};
