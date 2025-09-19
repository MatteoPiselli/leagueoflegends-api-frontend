import Image from "next/image";
import { memo, useMemo, useCallback } from "react";

const TeamPlayerAvatar = ({
  player,
  playerData,
  latestPatch,
  getChampionName,
  teamColor,
  searchPlayer,
}) => {
  // Memoize champion image URL
  const championImageUrl = useMemo(
    () =>
      `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${getChampionName(
        player.championId
      )}.png`,
    [latestPatch, getChampionName, player.championId]
  );

  // Check if this is the current player
  const isCurrentPlayer = player.puuid === playerData?.summoner?.puuid;

  // Handle player click with memoization
  const handlePlayerClick = useCallback(() => {
    searchPlayer(player.riotIdGameName, player.riotIdTagline);
  }, [searchPlayer, player.riotIdGameName, player.riotIdTagline]);

  return (
    <>
      <Image
        src={championImageUrl}
        alt={player.championName}
        width={16}
        height={16}
        className="rounded"
      />
      <span
        className={`text-xs truncate max-w-[80px] cursor-pointer ${
          isCurrentPlayer ? "font-bold text-white" : teamColor
        }`}
        onClick={handlePlayerClick}
      >
        {player.riotIdGameName?.substring(0, 10)}
      </span>
    </>
  );
};

export default memo(TeamPlayerAvatar);
