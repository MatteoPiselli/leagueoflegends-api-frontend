import { Participants } from "../Team";

const MatchExpansion = ({
  matchId,
  matchExpansion,
  teams,
  playerData,
  latestPatch,
  getChampionName,
}) => {
  const { isMatchExpanded } = matchExpansion;
  const isExpanded = isMatchExpanded(matchId);

  return (
    <>
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
    </>
  );
};

export default MatchExpansion;
