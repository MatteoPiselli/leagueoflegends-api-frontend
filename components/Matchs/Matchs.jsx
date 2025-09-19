import { memo } from "react";
import {
  useGameAssets,
  useMatchData,
  usePlayerCalculations,
  useTeamGoldCalculations,
  useMatchExpansion,
  useMatchDisplay,
  MatchCard,
  EmptyMatchState,
} from "./index";

const Matchs = ({
  matchData,
  playerData,
  latestPatch,
  searchPlayer,
  getChampionName,
  retryMatches,
}) => {
  // Use custom hooks
  const gameAssets = useGameAssets(latestPatch);
  const matchDataHook = useMatchData();
  const playerCalculations = usePlayerCalculations();
  const teamGoldCalculations = useTeamGoldCalculations();
  const matchExpansion = useMatchExpansion();
  const matchDisplay = useMatchDisplay();

  // Check if matchData is available
  if (!matchData || matchData.length === 0) {
    return (
      <EmptyMatchState playerData={playerData} retryMatches={retryMatches} />
    );
  }

  return (
    <div className="container flex flex-col rounded-lg mt-8">
      {matchData.map((match) => (
        <MatchCard
          key={match.matchDetails.metadata.matchId}
          match={match}
          playerData={playerData}
          latestPatch={latestPatch}
          searchPlayer={searchPlayer}
          getChampionName={getChampionName}
          gameAssets={gameAssets}
          matchDataHook={matchDataHook}
          playerCalculations={playerCalculations}
          teamGoldCalculations={teamGoldCalculations}
          matchDisplay={matchDisplay}
          matchExpansion={matchExpansion}
        />
      ))}
    </div>
  );
};

export default memo(Matchs);
