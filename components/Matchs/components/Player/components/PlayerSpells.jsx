import Image from "next/image";
import { useMemo } from "react";
import { SpellTooltip } from "../../UI";

const PlayerSpells = ({ currentPlayer, latestPatch, gameAssets }) => {
  const { getSummonerSpell } = gameAssets;

  // Get summoner spells with memoization
  const spells = useMemo(
    () =>
      [
        getSummonerSpell(currentPlayer.summoner1Id),
        getSummonerSpell(currentPlayer.summoner2Id),
      ].filter(Boolean), // Remove null/undefined
    [currentPlayer.summoner1Id, currentPlayer.summoner2Id, getSummonerSpell]
  );

  return (
    <div className="flex items-center space-x-1">
      {spells.map((spell, index) => (
        <SpellTooltip key={index} spell={spell} latestPatch={latestPatch}>
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/${spell.id}.png`}
            alt={spell.name}
            width={24}
            height={24}
            className="rounded-lg hover:scale-110 transition-transform"
          />
        </SpellTooltip>
      ))}
    </div>
  );
};

export default PlayerSpells;
