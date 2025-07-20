import Image from "next/image";

// ---------- Team Column component ---------- //
export default function TeamColumn({
  players,
  playerData,
  latestPatch,
  teamColor,
}) {
  if (!players || players.length === 0) {
    return <div className="text-gray-500">No players found</div>;
  }

  return (
    <div className="flex flex-col max-w-[80px]">
      {players.map((player, index) => (
        <div key={index} className="flex items-center space-x-1">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${player.championName}.png`}
            alt={player.championName}
            width={16}
            height={16}
            className="rounded"
          />
          <span
            className={`text-xs truncate max-w-[80px] ${
              player.puuid === playerData?.summoner?.puuid
                ? "font-bold text-white"
                : teamColor
            }`}
            title={player.riotIdGameName || player.summonerName}
          >
            {(player.riotIdGameName || player.summonerName)?.substring(0, 10)}
          </span>
        </div>
      ))}
    </div>
  );
}
