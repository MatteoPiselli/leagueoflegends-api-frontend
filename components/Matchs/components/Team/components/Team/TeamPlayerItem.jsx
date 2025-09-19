import { memo } from "react";
import { TeamPlayerAvatar } from "./";

const TeamPlayerItem = ({ 
  player, 
  playerData, 
  latestPatch, 
  getChampionName,
  teamColor,
  searchPlayer 
}) => {
  return (
    <div className="flex items-center space-x-1">
      <TeamPlayerAvatar
        player={player}
        playerData={playerData}
        latestPatch={latestPatch}
        getChampionName={getChampionName}
        teamColor={teamColor}
        searchPlayer={searchPlayer}
      />
    </div>
  );
};

export default memo(TeamPlayerItem);