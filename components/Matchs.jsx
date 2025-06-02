export default function Matchs({ matchData }) {
  if (!matchData || matchData.length === 0) {
    return <div>No match data available</div>;
  }

  return (
    <div className="mt-8">
      {matchData.map((match) => (
        <div
          key={match.matchDetails.metadata.matchId}
          className="bg-[#0D1520] rounded-lg p-4 mb-4"
        >
          <h3 className="border-b border-gray-300 pb-4">
            Match ID: {match.matchDetails.metadata.matchId}
          </h3>
          <p>Game Mode: {match.matchDetails.info.gameMode}</p>
          <p>
            Duration: {Math.floor(match.matchDetails.info.gameDuration / 60)}{" "}
            minutes
          </p>
          <p>
            Date:{" "}
            {new Date(
              match.matchDetails.info.gameCreation
            ).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
