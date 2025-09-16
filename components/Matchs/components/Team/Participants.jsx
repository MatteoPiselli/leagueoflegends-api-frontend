// Next
import Image from "next/image";

// ---------- Participants component ---------- //
export default function ParticipantsDisplay({
  team,
  playerData,
  latestPatch,
  getChampionName,
}) {
  if (!team || !team.players || team.players.length === 0) {
    return <div className="text-gray-500">No players found</div>;
  }

  return (
    <div className={`w-1/2 ${team.id === 100 ? "pr-2" : "pl-2"}`}>
      <h4 className={`text-sm font-semibold ${team.color} mb-2`}>
        {team.name}
      </h4>
      {team.players.map((player, index) => (
        <div key={index} className="flex items-center mb-1 text-xs">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${getChampionName(
              player.championId
            )}.png`}
            alt={player.championName}
            width={20}
            height={20}
            className="rounded"
          />
          <span
            className={`flex-1 truncate ${
              player.puuid === playerData?.summoner?.puuid
                ? "font-bold text-white"
                : "text-gray-400"
            }`}
          >
            {player.riotIdGameName || player.summonerName}
          </span>
          <span className="text-gray-400 ml-2">
            {player.kills}/{player.deaths}/{player.assists}
          </span>
        </div>
      ))}
    </div>
  );
}
