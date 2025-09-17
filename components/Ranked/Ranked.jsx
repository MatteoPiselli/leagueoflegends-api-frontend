import { RankCard, EmptyRankedState, QUEUE_TYPES } from "./index";

export default function Ranked({ rankedData }) {
  const rankedArray = Array.isArray(rankedData) ? rankedData : [];

  // Check if ranked data is available
  if (!rankedData || rankedArray.length === 0) {
    return <EmptyRankedState />;
  }

  return (
    <div className="h-fit w-full mt-8 p-4 bg-[#19191B] rounded-lg">
      {/* Ranked Data */}
      <div className="space-y-4">
        {QUEUE_TYPES.map((queueType) => {
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
