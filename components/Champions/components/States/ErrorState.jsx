export const ErrorState = ({ error, onRetry }) => (
  <div className="h-fit w-full p-4 bg-[#19191B] rounded-lg">
    <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#dd1029]">
      <h2 className="text-base text-white font-semibold">Champions Stats</h2>
    </div>
    <div className="text-center py-8">
      <p className="text-red-400 mb-4 text-sm">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-[#dd1029] text-white text-sm rounded hover:bg-[#b91027] transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);
