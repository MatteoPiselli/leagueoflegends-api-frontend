import { GAME_QUEUE_TYPES } from "../../../constants/queueTypes";

const QUEUE_IDS = ["400", "420", "440"]; // Normal Draft, Ranked Solo/Duo, Ranked Flex

export function QueueTypeSelector({ selectedQueueType, onQueueTypeChange }) {
  return (
    <div className="flex gap-2 mb-4">
      {QUEUE_IDS.map((queueId) => (
        <button
          key={queueId}
          onClick={() => onQueueTypeChange(queueId)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            selectedQueueType === queueId
              ? "bg-[#DD1129] text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {GAME_QUEUE_TYPES[queueId]}
        </button>
      ))}
    </div>
  );
}
