import Image from "next/image";

export const PlayerProfile = ({ playerData, latestPatch }) => {
  if (!playerData) return null;

  return (
    <div className="flex items-center">
      <div className="relative mt-8 h-[125px]">
        {/* Icon of the player */}
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/profileicon/${playerData.summoner.profileIconId}.png`}
          alt="Profile Icon"
          width={110}
          height={110}
          className="rounded-xl"
        />
        {/* Level of the player */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white rounded-xl py-1 px-2 text-sm">
          {playerData.summoner.level}
        </div>
      </div>
      {/* Username and Tag Line */}
      <div className="ml-4 text-xl">
        <span className="font-bold">{playerData.summoner.username}</span>
        <span className="text-gray-500">#{playerData.summoner.tagline}</span>
      </div>
    </div>
  );
};
