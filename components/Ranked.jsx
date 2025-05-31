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
    <div className="border ml-24 inline-block">
      {queueTypes.map((queue) => {
        const data = rankedData.find((e) => e.queueType === queue.key);
        return (
          <div key={queue.key}>
            <h3>{queue.label}</h3>
            <div>
              {data && data.tier ? (
                <>
                  <Image
                    src={tierIcons[data.tier]}
                    alt={`${data.tier} icon`}
                    width={100}
                    height={100}
                  />
                  <p>
                    Tier: {data.tier} {data.rank}
                  </p>
                  <p>LP: {data.leaguePoints}</p>
                  <p>
                    {((data.wins / (data.wins + data.losses)) * 100).toFixed(0)}
                    %
                  </p>
                </>
              ) : (
                <>
                  <Image
                    src="/icons/unranked.webp"
                    alt="Icon non classé"
                    width={100}
                    height={100}
                  />
                  <p>Unranked</p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
