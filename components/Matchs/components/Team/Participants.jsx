import { memo } from "react";
import { TeamHeader, PlayerRow } from "./components";

// ---------- Participants component ---------- //
const Participants = ({ team, playerData, latestPatch, getChampionName }) => {
  if (!team || !team.players || team.players.length === 0) {
    return <div className="text-gray-500">No players found</div>;
  }

  return (
    <div className={`w-1/2 ${team.id === 100 ? "pr-2" : "pl-2"}`}>
      <TeamHeader team={team} />
      {team.players.map((player, index) => (
        <PlayerRow
          key={index}
          player={player}
          playerData={playerData}
          latestPatch={latestPatch}
          getChampionName={getChampionName}
        />
      ))}
    </div>
  );
};

export default memo(Participants);
