import Image from "next/image";
import { ItemTooltip } from "../UI";

const PlayerStats = ({
  currentPlayer,
  latestPatch,
  gameAssets,
  matchData_hook,
  matchCalculations,
  matchDisplay,
  gameDuration,
}) => {
  const { getItemData } = gameAssets;
  const { getPlayerItems } = matchData_hook;
  const { calculateKDA, calculateCS } = matchCalculations;
  const { getKDAColor } = matchDisplay;

  // Calculate stats
  const kda = calculateKDA(
    currentPlayer.kills,
    currentPlayer.deaths,
    currentPlayer.assists
  );
  const { cs, csPerMin } = calculateCS(
    currentPlayer.totalMinionsKilled,
    currentPlayer.neutralMinionsKilled,
    gameDuration
  );
  const playerItems = getPlayerItems(currentPlayer);

  return (
    <>
      {/* KDA */}
      <div className="flex flex-col text-sm text-center">
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
      </div>

      {/* CS */}
      <p className="flex flex-col text-sm text-center">
        {cs} CS
        <span className="text-gray-500">({csPerMin})</span>
      </p>

      {/* Items */}
      <div className="flex flex-wrap gap-1 max-w-[110px] mt-2">
        {playerItems.map((itemId, index) => {
          if (itemId === 0) {
            return (
              <div
                key={index}
                className="w-6 h-6 bg-gray-700 border border-gray-600 rounded"
              ></div>
            );
          }

          const item = getItemData(itemId);
          return (
            <ItemTooltip
              key={index}
              latestPatch={latestPatch}
              itemId={itemId}
              item={item}
            >
              <div className="relative hover:scale-110 transition-transform">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/item/${itemId}.png`}
                  alt={item?.name || "Item"}
                  width={24}
                  height={24}
                  className="rounded border border-gray-600"
                />
              </div>
            </ItemTooltip>
          );
        })}
      </div>
    </>
  );
};

export default PlayerStats;
