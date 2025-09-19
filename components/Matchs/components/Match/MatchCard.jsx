import MatchHeader from "./MatchHeader";
import { PlayerMatchInfo, PlayerStats } from "../Player";
import { TeamColumn, Participants } from "../Team";

const MatchCard = ({
  match,
  playerData,
  latestPatch,
  searchPlayer,
  getChampionName,
  gameAssets,
  matchDataHook,
  playerCalculations,
  teamGoldCalculations,
  matchDisplay,
  matchExpansion,
}) => {
  const { splitTeams } = matchDataHook;
  const { toggleMatchDetails, isMatchExpanded } = matchExpansion;

  // Find current player in the match
  const currentPlayer = match.matchDetails.info.participants.find(
    (p) => p.puuid === playerData?.summoner?.puuid
  );

  if (!currentPlayer) return null;

  // Process teams
  const { blueTeam, redTeam, teams } = splitTeams(
    match.matchDetails.info.participants
  );

  const matchId = match.matchDetails.metadata.matchId;
  const isExpanded = isMatchExpanded(matchId);

  return (
    <div className="bg-[#19191B] rounded-lg pl-4 pr-4 pt-2 pb-2 mb-4">
      {/* Match Header */}
      <MatchHeader
        match={match}
        currentPlayer={currentPlayer}
        matchDisplay={matchDisplay}
      />

      {/* Match Content */}
      <div className="flex items-center justify-between space-x-2 mt-2">
        {/* Player Info & Stats */}
        <PlayerMatchInfo
          currentPlayer={currentPlayer}
          latestPatch={latestPatch}
          getChampionName={getChampionName}
          gameAssets={gameAssets}
          matchDataHook={matchDataHook}
          playerCalculations={playerCalculations}
          teamGoldCalculations={teamGoldCalculations}
          matchDisplay={matchDisplay}
        />

        <PlayerStats
          currentPlayer={currentPlayer}
          latestPatch={latestPatch}
          gameAssets={gameAssets}
          matchDataHook={matchDataHook}
          playerCalculations={playerCalculations}
          teamGoldCalculations={teamGoldCalculations}
          matchDisplay={matchDisplay}
          gameDuration={match.matchDetails.info.gameDuration}
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

        {/* Toggle button */}
        <button
          onClick={() => toggleMatchDetails(matchId)}
          className="ml-4 p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isExpanded ? "rotate-180" : "rotate-0"
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

      {/* Detailed teams view */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-500">
          <div className="flex justify-between">
            {teams.map((team) => (
              <Participants
                key={team.id}
                team={team}
                playerData={playerData}
                latestPatch={latestPatch}
                getChampionName={getChampionName}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCard;
