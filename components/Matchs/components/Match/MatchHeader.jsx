// Queue ID mappings - could be moved to a constants file
const QUEUE_TYPES = {
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

const MatchHeader = ({ match, currentPlayer, matchDisplay }) => {
  const { info } = match.matchDetails;
  const { formatGameDuration, getWinLossColor, formatTimeAgo } = matchDisplay;

  return (
    <div className="flex items-center justify-between border-b border-[#dd1029]">
      <div className="mb-2">
        {/* Queue type & Victory/Defeat */}
        <h3>{QUEUE_TYPES[info.queueId] || "Unknown Queue"}</h3>
        <p>
          <span className={getWinLossColor(currentPlayer?.win)}>
            {currentPlayer?.win ? "Victory" : "Defeat"}
          </span>
        </p>
      </div>
      <div className="mb-2">
        {/* Match duration & Match date */}
        <p>{formatGameDuration(info.gameDuration)}</p>
        <p>{formatTimeAgo(info.gameCreation)}</p>
      </div>
    </div>
  );
};

export default MatchHeader;
