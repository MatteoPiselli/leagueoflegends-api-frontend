import { useMemo } from "react";
import { usePlayerCalculations } from "../../hooks/calculations/usePlayerCalculations";

const PlayerStats = ({ currentPlayer, matchDisplay, gameDuration }) => {
  const { calculateKDA, calculateCS } = usePlayerCalculations();
  const { getKDAColor } = matchDisplay;

  // Calculate stats with memoization
  const kda = useMemo(
    () =>
      calculateKDA(
        currentPlayer.kills,
        currentPlayer.deaths,
        currentPlayer.assists
      ),
    [
      currentPlayer.kills,
      currentPlayer.deaths,
      currentPlayer.assists,
      calculateKDA,
    ]
  );

  const { cs, csPerMin } = useMemo(
    () =>
      calculateCS(
        currentPlayer.totalMinionsKilled,
        currentPlayer.neutralMinionsKilled,
        gameDuration
      ),
    [
      currentPlayer.totalMinionsKilled,
      currentPlayer.neutralMinionsKilled,
      gameDuration,
      calculateCS,
    ]
  );

  return (
    <div className="flex flex-col space-y-1 text-center text-sm">
      {/* KDA */}
      <p className="space-x-1">
        <span>{currentPlayer.kills}</span>
        <span>/</span>
        <span>{currentPlayer.deaths}</span>
        <span>/</span>
        <span>{currentPlayer.assists}</span>
      </p>
      <p className={getKDAColor(kda)}>
        {kda} <span className="text-gray-500">KDA</span>
      </p>

      {/* CS */}
      <div className="flex text-sm space-x-1">
        <span>{cs} CS</span>
        <span className="text-gray-500">({csPerMin})</span>
      </div>
    </div>
  );
};

export default PlayerStats;
