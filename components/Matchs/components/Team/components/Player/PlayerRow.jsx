import { memo } from "react";
import { PlayerAvatar, PlayerKDA } from "./";

const PlayerRow = ({ 
  player, 
  playerData, 
  latestPatch, 
  getChampionName 
}) => {
  return (
    <div className="flex items-center mb-1 text-xs">
      <PlayerAvatar
        player={player}
        playerData={playerData}
        latestPatch={latestPatch}
        getChampionName={getChampionName}
      />
      <PlayerKDA
        kills={player.kills}
        deaths={player.deaths}
        assists={player.assists}
      />
    </div>
  );
};

export default memo(PlayerRow);