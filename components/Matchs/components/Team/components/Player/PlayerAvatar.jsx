import Image from "next/image";
import { memo, useMemo } from "react";

const PlayerAvatar = ({ player, playerData, latestPatch, getChampionName }) => {
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

  return (
    <>
      <Image
        src={championImageUrl}
        alt={player.championName}
        width={20}
        height={20}
        className="rounded"
      />
      <span
        className={`flex-1 truncate ${
          isCurrentPlayer ? "font-bold text-white" : "text-gray-400"
        }`}
      >
        {player.riotIdGameName || player.summonerName}
      </span>
    </>
  );
};

export default memo(PlayerAvatar);
