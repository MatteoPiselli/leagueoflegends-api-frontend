export default function Matchs({ matchData }) {
  if (!matchData || matchData.length === 0) {
    return (
      <div className="w-full flex justify-center items-center border border-[#dd1029] mt-8">
        No match data available
      </div>
    );
  }

  const queueId = {
    400: "Normal Draft",
    420: "Ranked Solo/Duo",
    430: "Normal Blind Pick",
    440: "Ranked Flex",
    450: "ARAM",
    700: "Clash",
    720: "ARAM Clash",
    900: "AURF",
    1090: "Teamfight Tactics",
    1100: "Ranked TFT",
    1700: "Arena",
    1710: "Arena",
    2000: "Tutorial",
    2010: "Tutorial",
    2020: "Tutorial",
  };

  return (
    <div className="w-full flex flex-col border border-[#dd1029] rounded-lg mt-8">
      {matchData.map((match) => (
        <div
          key={match.matchDetails.metadata.matchId}
          className="bg-[#19191B] rounded-lg p-4 mb-4"
        >
          <h3 className="border-b border-gray-300 pb-4">
            {queueId[match.matchDetails.info.queueId] || "Unknown Queue"}
          </h3>
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
