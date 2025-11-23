import Image from "next/image";
import { useMemo, memo } from "react";
import { RuneTooltip } from "../../UI";

const PlayerRunes = ({ currentPlayer, gameAssets }) => {
  const { getRuneData, getRuneTreeData } = gameAssets;

  // Get rune data with memoization
  const runes = useMemo(() => {
    // Safety check for functions
    if (!getRuneData || !getRuneTreeData) {
      return [];
    }

    const primary = getRuneData(
      currentPlayer?.perks?.styles?.[0]?.selections?.[0]?.perk
    );
    const secondary = getRuneTreeData(currentPlayer?.perks?.styles?.[1]?.style);

    return [
      primary && { ...primary, size: 24 },
      secondary && { ...secondary, size: 20 },
    ].filter(Boolean); // Remove null/undefined
  }, [currentPlayer?.perks?.styles, getRuneData, getRuneTreeData]);

  return (
    <div className="flex items-center space-x-1">
      {runes.map((rune, index) => (
        <RuneTooltip key={index} rune={rune}>
          <Image
            src={rune.icon}
            alt={rune.name || `Rune ${index + 1}`}
            width={rune.size}
            height={rune.size}
            className="hover:scale-110 transition-transform"
          />
        </RuneTooltip>
      ))}
    </div>
  );
};

export default memo(PlayerRunes);
