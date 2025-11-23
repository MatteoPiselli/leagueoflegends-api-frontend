import Image from "next/image";

export const ChampionInfo = ({
  champion,
  latestPatch,
  getChampionName,
  getChampionId,
}) => {
  const championName = getChampionName(champion.championId);
  const championId = getChampionId(champion.championId);

  return (
    <div className="flex items-center w-32 space-x-2">
      <div className="w-8 h-8 rounded-lg overflow-hidden">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${championId}.png`}
          alt={championName}
          width={32}
          height={32}
          className="scale-[1.2]"
        />
      </div>
      <div className="w-2/3">
        <h3 className="text-white font-medium text-sm">{championName}</h3>
        <p className="text-gray-400 text-xs">
          <span>{champion.averageStats.cs} CS</span>
          <span> ({champion.averageStats.csPerMinute})</span>
        </p>
      </div>
    </div>
  );
};
