export const RefreshButton = ({ onRefresh, loading, disabled }) => (
  <div className="mt-4 pt-3 border-t border-gray-700">
    <button
      onClick={onRefresh}
      disabled={disabled}
      className="w-full py-2 px-4 bg-[#2a2a2e] text-gray-300 text-xs rounded hover:bg-[#35353a] transition-colors disabled:opacity-50"
    >
      {loading ? "Updating..." : "Refresh Stats"}
    </button>
  </div>
);