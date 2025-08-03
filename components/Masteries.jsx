import Image from "next/image";

export default function Masteries({
  masteriesData,
  latestPatch,
  getChampionName,
}) {
  console.log("Masteries component loaded with masteriesData:", masteriesData);

  // ---------- Check if mastery data is available ---------- //
  if (!masteriesData || masteriesData.length === 0) {
    return (
      <div className="w-full flex justify-center items-center border border-[#dd1029] mt-8 p-8">
        <p className="text-gray-400">No mastery data available</p>
      </div>
    );
  }

  // ---------- Function to get mastery icon URL ---------- //
  const getMasteryIconUrl = (championLevel) => {
    const baseUrl = `https://raw.communitydragon.org/latest/game/assets/ux/mastery/legendarychampionmastery/`;

    switch (championLevel) {
      case 4:
        return `${baseUrl}masterycrest_level4_minis.cm_updates.png`;
      case 5:
        return `${baseUrl}masterycrest_level5_minis.cm_updates.png`;
      case 6:
        return `${baseUrl}masterycrest_level6_minis.cm_updates.png`;
      case 7:
        return `${baseUrl}masterycrest_level7_minis.cm_updates.png`;
      case 8:
        return `${baseUrl}masterycrest_level8_minis.cm_updates.png`;
      case 9:
        return `${baseUrl}masterycrest_level9_minis.cm_updates.png`;
      case 10:
        return `${baseUrl}masterycrest_level10_minis.cm_updates.png`;
      default:
        if (championLevel > 10) {
          return `${baseUrl}masterycrest_level10_minis.cm_updates.png`;
        }
        return `${baseUrl}masterycrest_level0_minis.cm_updates.png`;
    }
  };

  return (
    <div className="h-fit w-full mt-8 p-4 bg-[#19191B] rounded-lg">
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#dd1029]">
        <h2 className="text-base text-white">Masteries</h2>
      </div>
      {/* ---------- Mastery List ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {masteriesData.map((champion) => {
          const championName = getChampionName(champion.championId);
          const masteryLevel = champion.championLevel;
          const masteryPoints = champion.championPoints;
          const banner =
            "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/banner-primary.png";

          return (
            <div
              key={champion.championId}
              className="relative flex flex-col items-center p-4 rounded-lg min-w-0"
            >
              {/* ---------- Champion Banner ---------- */}
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={banner}
                  alt={`${championName} banner`}
                  width={100}
                  height={270}
                  className="rounded-lg"
                />
              </div>
              {/* ---------- Champion Icon ---------- */}
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${championName}.png`}
                alt={championName}
                width={60}
                height={60}
                className="rounded-full scale-[1.2]"
              />
              <p className="text-sm text-gray-400 text-center truncate w-full z-10">
                {championName}
              </p>
              {/* ---------- Mastery Icon & Level ---------- */}
              <div className="flex flex-col items-center mb-2 -space-y-1">
                <Image
                  src={getMasteryIconUrl(masteryLevel)}
                  alt={`Mastery Level ${masteryLevel}`}
                  width={40}
                  height={40}
                />
                <p className="text-xs text-gray-400 text-center bg-[#19191B] rounded-lg p-1 z-10">
                  {masteryLevel}
                </p>
              </div>
              {/* ---------- Mastery Points ---------- */}
              <p className="text-xs text-gray-400 text-center mb-2 z-10">
                {masteryPoints} Pts
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
