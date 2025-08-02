import Image from "next/image";

const tierIcons = {
  IRON: "/icons/iron.png",
  BRONZE: "/icons/bronze.png",
  SILVER: "/icons/silver.png",
  GOLD: "/icons/gold.png",
  PLATINUM: "/icons/platinum.png",
  EMERALD: "/icons/emerald.png",
  DIAMOND: "/icons/diamond.png",
  MASTER: "/icons/master.png",
  GRANDMASTER: "/icons/grandmaster.png",
  CHALLENGER: "/icons/challenger.png",
};

const queueTypes = [
  { key: "RANKED_SOLO_5x5", label: "Ranked Solo/Duo" },
  { key: "RANKED_FLEX_SR", label: "Ranked Flex" },
];

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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs md:text-sm space-y-4 sm:space-y-0">
                  {/* Icon and main information */}
                  <div className="flex items-center space-x-4">
                    <Image
                      src={tierIcons[data.tier]}
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
                <div className="flex items-center space-x-4">
                  <Image
                    src="/icons/unranked.webp"
                    alt="Icon non classé"
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
