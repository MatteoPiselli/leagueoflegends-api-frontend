import { RankCard, EmptyRankedState, RANKED_QUEUE_TYPES } from "./index";

export default function Ranked({ rankedData }) {
  const rankedArray = Array.isArray(rankedData) ? rankedData : [];

  // Check if ranked data is available
  if (!rankedData || rankedArray.length === 0) {
    return <EmptyRankedState />;
  }

  return (
    <div className="h-fit w-full mt-8 p-4 bg-[#19191B] rounded-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#dd1029]">
        <h2 className="text-base font-semibold text-white">Ranked</h2>
      </div>
      {/* Ranked Data */}
      <div className="space-y-4">
        {RANKED_QUEUE_TYPES.map((queueType) => {
          const queueData = rankedArray.find(
            (data) => data.queueType === queueType.key
          );

          return (
            <RankCard
              key={queueType.key}
              queueData={queueData}
              queueType={queueType}
            />
          );
        })}
      </div>
    </div>
  );
}
