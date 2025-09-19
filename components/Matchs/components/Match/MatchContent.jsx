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
  matchId,
  matchExpansion,
}) => {
  const { splitTeams } = matchDataHook;

  // Process teams
  const { blueTeam, redTeam } = splitTeams(participants);

  return (
    <div className="flex items-center justify-between space-x-6 flex-1">
      {/* Player Info & Stats */}
      <div className="flex items-center space-x-4 flex-shrink-0">
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
      </div>

      {/* Team Columns */}
      <div className="flex items-center justify-center space-x-6 flex-1 min-w-0">
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

      {/* Toggle button */}
      <button
        onClick={() => matchExpansion.toggleMatchDetails(matchId)}
        className="flex-shrink-0 ml-4 p-2 hover:bg-gray-700 rounded transition-colors"
      >
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            matchExpansion.isMatchExpanded(matchId) ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default MatchContent;
