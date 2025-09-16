import { MasteryCard, EmptyMasteryState } from "./index";

export default function Masteries({
  masteriesData,
  latestPatch,
  getChampionName,
}) {
  // Check if mastery data is available
  if (!masteriesData || masteriesData.length === 0) {
    return <EmptyMasteryState />;
  }

  return (
    <div className="h-fit w-full mt-8 p-4 bg-[#19191B] rounded-lg">
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#dd1029]">
        <h2 className="text-base font-semibold text-white">Masteries</h2>
      </div>
      {/* ---------- Masteries List ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {masteriesData.map((mastery) => (
          <MasteryCard
            key={mastery.championId}
            mastery={mastery}
            latestPatch={latestPatch}
            getChampionName={getChampionName}
          />
        ))}
      </div>
    </div>
  );
}
