import { formatDistanceToNow } from "date-fns";

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

const MatchHeader = ({ match, currentPlayer }) => {
  const { info } = match.matchDetails;

  const formatGameDuration = (gameDuration) => {
    const minutes = Math.floor(gameDuration / 60);
    const seconds = (gameDuration % 60).toString().padStart(2, "0");
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex items-center justify-between border-b border-[#dd1029]">
      <div className="mb-2">
        {/* Queue type & Victory/Defeat */}
        <h3>{queueId[info.queueId] || "Unknown Queue"}</h3>
        <p>
          {currentPlayer?.win ? (
            <span className="text-sky-500">Victory</span>
          ) : (
            <span className="text-red-500">Defeat</span>
          )}
        </p>
      </div>
      <div className="mb-2">
        {/* Match duration & Match date */}
        <p>{formatGameDuration(info.gameDuration)}</p>
        <p>
          {formatDistanceToNow(new Date(info.gameCreation), {
            addSuffix: true,
          }).replace("about", "")}
        </p>
      </div>
    </div>
  );
};

export default MatchHeader;
