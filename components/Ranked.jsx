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
  { key: "RANKED_SOLO_5x5", label: "Classé en Solo/Duo" },
  { key: "RANKED_FLEX_SR", label: "Classé en Flex" },
];

export default function Ranked({ rankedData }) {
  if (!rankedData || rankedData.length === 0) {
    return <div>No ranked data available</div>;
  }

  return (
    <div className="mt-8 inline-block">
      {queueTypes.map((queue) => {
        const data = rankedData.find((e) => e.queueType === queue.key);
        return (
          <div key={queue.key} className="bg-[#0D1520] rounded-lg p-4">
            <h3 className="border-b border-gray-300 pb-4">{queue.label}</h3>
            <div>
              {data && data.tier ? (
                <div className="flex flex-row items-center">
                  <Image
                    src={tierIcons[data.tier]}
                    alt={`${data.tier} icon`}
                    width={90}
                    height={90}
                  />
                  <div className="flex flex-col p-4">
                    <p>
                      {data.tier} {data.rank}
                    </p>
                    <p>{data.leaguePoints} LP</p>
                  </div>
                  <div className="pl-8 pt-8 pb-8">
                    <p>
                      {data.wins}V {data.losses}D
                    </p>
                    <p>
                      {((data.wins / (data.wins + data.losses)) * 100).toFixed(
                        0
                      )}{" "}
                      % WR
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <Image
                    src="/icons/unranked.webp"
                    alt="Icon non classé"
                    width={90}
                    height={90}
                  />
                  <p className="p-4">Unranked</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
