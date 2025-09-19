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
        matchId={matchId}
        matchExpansion={matchExpansion}
      />

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
