import Image from "next/image";
import { usePlayerData } from "../../../../hooks/usePlayerData";
import { useUpdateInfo } from "../../../../hooks/ui/useUpdateInfo";

export const PlayerProfile = ({ playerData: propPlayerData, latestPatch }) => {
  const { isLoading, searchPlayer, playerData } = usePlayerData();
  const { getLastUpdateDate } = useUpdateInfo(playerData);

  // Use global playerData if available, fallback to props
  const currentPlayerData = playerData || propPlayerData;

  if (!currentPlayerData) return null;

  const handleUpdateProfile = async () => {
    if (
      currentPlayerData?.summoner?.username &&
      currentPlayerData?.summoner?.tagline
    ) {
      await searchPlayer(
        currentPlayerData.summoner.username,
        currentPlayerData.summoner.tagline,
        true // Force update when clicking the update button
      );
    }
  };

  const lastUpdate = getLastUpdateDate();

  return (
    <div className="flex items-center">
      <div className="relative mt-8 h-[125px]">
        {/* Icon of the player */}
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/profileicon/${currentPlayerData.summoner.profileIconId}.png`}
          alt="Profile Icon"
          width={110}
          height={110}
          className="rounded-xl"
        />
        {/* Level of the player */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white rounded-xl py-1 px-2 text-sm">
          {currentPlayerData.summoner.level}
        </div>
      </div>
      {/* Username and Tag Line */}
      <div className="flex flex-col ml-4 text-xl space-y-4">
        <div className="flex flex-row">
          <span className="font-bold">
            {currentPlayerData.summoner.username}
          </span>
          <span className="text-gray-500">
            #{currentPlayerData.summoner.tagline}
          </span>
        </div>
        {/* Button to update profile */}
        <button
          onClick={handleUpdateProfile}
          disabled={isLoading}
          className="px-3 py-1 bg-[#23232a] text-xs text-gray-300 rounded border border-gray-700 hover:bg-[#35353a] transition-colors disabled:opacity-50"
        >
          {isLoading
            ? "Updating..."
            : `Update ${lastUpdate ? `(${lastUpdate})` : ""}`}
        </button>
      </div>
    </div>
  );
};
