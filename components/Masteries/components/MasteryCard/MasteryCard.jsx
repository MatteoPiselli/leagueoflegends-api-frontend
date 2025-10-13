import Image from "next/image";
import { useMasteryDisplay } from "../../hooks/ui";

export const MasteryCard = ({
  mastery,
  latestPatch,
  getChampionName,
  getChampionId,
}) => {
  const { formatMasteryPoints, getMasteryIconUrl } = useMasteryDisplay();

  const championName = getChampionName(mastery.championId);
  const championId = getChampionId(mastery.championId);
  const masteryLevel = mastery.championLevel;
  const masteryPoints = mastery.championPoints;
  const banner =
    "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/banner-primary.png";

  return (
    <div className="relative flex flex-col items-center p-4 rounded-lg min-w-0">
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
        src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${championId}.png`}
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
        {formatMasteryPoints(masteryPoints)} Pts
      </p>
    </div>
  );
};
