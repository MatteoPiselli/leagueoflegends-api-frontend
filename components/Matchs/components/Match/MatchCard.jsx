import MatchHeader from "./MatchHeader";
import MatchContent from "./MatchContent";
import MatchExpansion from "./MatchExpansion";
import { useCurrentPlayer } from "../../hooks/data/useCurrentPlayer";

const MatchCard = ({
  match,
  playerData,
  latestPatch,
  searchPlayer,
  getChampionName,
  gameAssets,
  matchDataHook,
  matchDisplay,
  matchExpansion,
}) => {
  const { splitTeams } = matchDataHook;

  // Find current player in the match
  const currentPlayer = useCurrentPlayer(match, playerData);

  if (!currentPlayer) return null;

  // Process teams for expansion view
  const { teams } = splitTeams(match.matchDetails.info.participants);
  const matchId = match.matchDetails.metadata.matchId;

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
        <MatchContent
          currentPlayer={currentPlayer}
          latestPatch={latestPatch}
          getChampionName={getChampionName}
          gameAssets={gameAssets}
          matchDataHook={matchDataHook}
          matchDisplay={matchDisplay}
          playerData={playerData}
          searchPlayer={searchPlayer}
          gameDuration={match.matchDetails.info.gameDuration}
          participants={match.matchDetails.info.participants}
        />

        {/* Toggle button */}
        <button
          onClick={() => matchExpansion.toggleMatchDetails(matchId)}
          className="ml-4 p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <div
            className={`w-0 h-0 transition-transform duration-200 ${
              matchExpansion.isMatchExpanded(matchId)
                ? "border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"
                : "border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"
            }`}
          />
        </button>
      </div>

      {/* Detailed teams view */}
      <MatchExpansion
        matchId={matchId}
        matchExpansion={matchExpansion}
        teams={teams}
        playerData={playerData}
        latestPatch={latestPatch}
        getChampionName={getChampionName}
      />
    </div>
  );
};

export default MatchCard;
