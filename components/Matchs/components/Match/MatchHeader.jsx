import { QUEUE_TYPES } from "../../../../constants/queueTypes";

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
