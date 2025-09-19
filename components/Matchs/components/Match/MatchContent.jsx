import { PlayerMatchInfo, PlayerStats } from "../Player";
import { TeamColumn } from "../Team";

const MatchContent = ({
  currentPlayer,
  latestPatch,
  getChampionName,
  gameAssets,
  matchDataHook,
  matchDisplay,
  playerData,
  searchPlayer,
  gameDuration,
  participants,
}) => {
  const { splitTeams } = matchDataHook;

  // Process teams
  const { blueTeam, redTeam } = splitTeams(participants);

  return (
    <div className="flex items-center justify-between space-x-2 mt-2">
      {/* Player Info & Stats */}
      <PlayerMatchInfo
        currentPlayer={currentPlayer}
        latestPatch={latestPatch}
        getChampionName={getChampionName}
        gameAssets={gameAssets}
        matchDataHook={matchDataHook}
        matchDisplay={matchDisplay}
      />

      <PlayerStats
        currentPlayer={currentPlayer}
        matchDisplay={matchDisplay}
        gameDuration={gameDuration}
      />

      {/* Team Columns */}
      <div className="flex items-center space-x-4 flex-1 ml-4">
        <TeamColumn
          players={blueTeam}
          playerData={playerData}
          latestPatch={latestPatch}
          teamColor="text-blue-400"
          searchPlayer={searchPlayer}
          getChampionName={getChampionName}
        />
        <TeamColumn
          players={redTeam}
          playerData={playerData}
          latestPatch={latestPatch}
          teamColor="text-red-400"
          searchPlayer={searchPlayer}
          getChampionName={getChampionName}
        />
      </div>
    </div>
  );
};

export default MatchContent;
