import Image from "next/image";

const queueTypes = [
  { key: "RANKED_SOLO_5x5", label: "Ranked Solo/Duo" },
  { key: "RANKED_FLEX_SR", label: "Ranked Flex" },
];

// ------ Function to get rank icon URL ------ //
const getRankIconUrl = (tier) => {
  const baseUrl = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/`;

  switch (tier) {
    case "IRON":
      return `${baseUrl}iron.png`;
    case "BRONZE":
      return `${baseUrl}bronze.png`;
    case "SILVER":
      return `${baseUrl}silver.png`;
    case "GOLD":
      return `${baseUrl}gold.png`;
    case "PLATINUM":
      return `${baseUrl}platinum.png`;
    case "EMERALD":
      return `${baseUrl}emerald.png`;
    case "DIAMOND":
      return `${baseUrl}diamond.png`;
    case "MASTER":
      return `${baseUrl}master.png`;
    case "GRANDMASTER":
      return `${baseUrl}grandmaster.png`;
    case "CHALLENGER":
      return `${baseUrl}challenger.png`;
    default:
      return `${baseUrl}unranked.png`;
  }
};

export default function Ranked({ rankedData }) {
  return (
    <div className="h-fit w-full mt-8 p-4 bg-[#19191B] rounded-lg">
      {queueTypes.map((queue, index) => {
        const data = rankedData.find((q) => q.queueType === queue.key);
        return (
          <div key={queue.key} className={index > 0 ? "mt-6" : ""}>
            <h3 className="border-b border-[#DD1029] pb-4 text-sm md:text-base">
              {queue.label}
            </h3>
            <div className="mt-4">
              {data && data.tier ? (
                // ---------- Display Ranked Data ---------- //
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs md:text-sm space-y-4 sm:space-y-0">
                  {/* Icon and main information */}
                  <div className="flex items-center space-x-4">
                    <Image
                      src={getRankIconUrl(data.tier)}
                      alt={`${data.tier} icon`}
                      width={60}
                      height={60}
                      className="sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px]"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm md:text-base">
                        {data.tier} {data.rank}
                      </p>
                      <p className="text-gray-400">{data.leaguePoints} LP</p>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="flex flex-col items-start sm:items-end space-y-1">
                    <p className="text-gray-300">
                      {data.wins}V {data.losses}D
                    </p>
                    <p className="text-gray-300">
                      {((data.wins / (data.wins + data.losses)) * 100).toFixed(
                        0
                      )}{" "}
                      % WR
                    </p>
                  </div>
                </div>
              ) : (
                // ---------- Display Unranked State ---------- //
                <div className="flex items-center space-x-4">
                  <Image
                    src={getRankIconUrl("UNRANKED")}
                    alt="Unranked icon"
                    width={60}
                    height={60}
                    className="sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px]"
                  />
                  <p className="text-sm md:text-base text-gray-400">Unranked</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
