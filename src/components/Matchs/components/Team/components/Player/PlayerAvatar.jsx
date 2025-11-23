import Image from "next/image";
import { memo } from "react";

const PlayerAvatar = ({ player, playerData, latestPatch, getChampionId }) => {
  const championId = getChampionId(player.championId);

  // Check if this is the current player
  const isCurrentPlayer = player.puuid === playerData?.summoner?.puuid;

  return (
    <>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${championId}.png`}
        alt={championId}
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
