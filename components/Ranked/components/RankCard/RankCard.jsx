import Image from "next/image";
import { useRankedCalculations } from "../../hooks/calculations";
import { useRankedUtils } from "../../hooks/utils/useRankedUtils";
import { UnrankedCard } from "./UnrankedCard";

export const RankCard = ({ queueData, queueType }) => {
  const { calculateWinRate, calculateTotalGames } = useRankedCalculations();
  const { getRankIconUrl, getRankDisplayName } = useRankedUtils();

  if (!queueData) {
    return <UnrankedCard queueType={queueType} />;
  }

  const winRate = calculateWinRate(queueData.wins, queueData.losses);
  const totalGames = calculateTotalGames(queueData.wins, queueData.losses);

  return (
    <div className="p-3 bg-[#1e1e20] rounded-lg">
      <div className="flex items-center justify-between">
        {/* Rank Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <Image
              src={getRankIconUrl(queueData.tier)}
              alt={queueData.tier}
              width={48}
              height={48}
            />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">
              {queueType.label}
            </h3>
            <p className={`text-xs font-semibold`}>
              {getRankDisplayName(queueData.tier, queueData.rank)}
            </p>
            <p className="text-gray-400 text-xs">{queueData.leaguePoints} LP</p>
          </div>
        </div>

        {/* Stats */}
        <div className="text-right">
          <div className="text-white text-sm font-semibold">{winRate}% WR</div>
          <div className="text-gray-400 text-xs">
            {queueData.wins}W {queueData.losses}L
          </div>
          <div className="text-gray-400 text-xs">{totalGames} games</div>
        </div>
      </div>
    </div>
  );
};
