import Image from "next/image";
import { useMemo } from "react";
import { ItemTooltip } from "../../UI";

const PlayerItems = ({
  currentPlayer,
  latestPatch,
  gameAssets,
  matchDataHook,
}) => {
  const { getItemData } = gameAssets;
  const { getPlayerItems } = matchDataHook;

  // Get player items with memoization
  const playerItems = useMemo(
    () => getPlayerItems(currentPlayer),
    [currentPlayer, getPlayerItems]
  );

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex flex-wrap gap-1 max-w-[110px]">
        {playerItems.map((itemId, index) => {
          if (itemId === 0) {
            return (
              <div
                key={index}
                className="w-6 h-6 bg-gray-700 border border-gray-600 rounded"
              />
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
    </div>
  );
};

export default PlayerItems;
