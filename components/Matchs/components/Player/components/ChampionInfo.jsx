import Image from "next/image";

const ChampionInfo = ({ currentPlayer, latestPatch, getChampionName }) => {
  return (
    <div className="relative w-[60px] h-[60px] mt-2">
      <div className="flex items-center space-x-4 rounded-md overflow-hidden w-[50px] h-[50px]">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${getChampionName(
            currentPlayer.championId
          )}.png`}
          alt={getChampionName(currentPlayer.championId)}
          width={50}
          height={50}
          className="scale-[1.2]"
        />
        <span className="absolute right-0 bottom-0 bg-[#121212] text-white text-xs px-1 py-0.5 rounded-full min-w-[20px] text-center">
          {currentPlayer.champLevel}
        </span>
      </div>
    </div>
  );
};

export default ChampionInfo;
