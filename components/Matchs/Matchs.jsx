import {
  useGameAssets,
  useMatchData,
  useMatchCalculations,
  useMatchExpansion,
  useMatchDisplay,
  MatchCard,
  EmptyMatchState,
} from "./index";

export default function Matchs({
  matchData,
  playerData,
  latestPatch,
  searchPlayer,
  getChampionName,
  retryMatches,
}) {
  // Use custom hooks
  const gameAssets = useGameAssets(latestPatch);
  const matchData_hook = useMatchData();
  const matchCalculations = useMatchCalculations();
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
          matchData_hook={matchData_hook}
          matchCalculations={matchCalculations}
          matchDisplay={matchDisplay}
          matchExpansion={matchExpansion}
        />
      ))}
    </div>
  );
}
