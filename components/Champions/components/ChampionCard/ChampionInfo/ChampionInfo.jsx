import Image from "next/image";

export const ChampionInfo = ({ champion, latestPatch, getChampionName }) => (
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 rounded-lg overflow-hidden">
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${getChampionName(
          champion.championId
        )}.png`}
        alt={champion.championName}
        width={48}
        height={48}
        className="scale-[1.2]"
      />
    </div>
    <div>
      <h3 className="text-white font-medium text-sm">
        {champion.championName}
      </h3>
      <p className="text-gray-400 text-xs">{champion.games} games</p>
    </div>
  </div>
);