import { memo } from "react";
import { TeamPlayerItem } from "./components";

// ---------- Team Column component ---------- //
const TeamColumn = ({
  latestPatch,
  players,
  playerData,
  teamColor,
  searchPlayer,
  getChampionName,
}) => {
  if (!players || players.length === 0) {
    return <div className="text-gray-500">No players found</div>;
  }

  return (
    <div className="flex flex-col max-w-[80px]">
      {players.map((player, index) => (
        <TeamPlayerItem
          key={index}
          player={player}
          playerData={playerData}
          latestPatch={latestPatch}
          getChampionName={getChampionName}
          teamColor={teamColor}
          searchPlayer={searchPlayer}
        />
      ))}
    </div>
  );
};

export default memo(TeamColumn);
