export const ChampionsHeader = () => (
  <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#dd1029]">
    <h2 className="text-base text-white font-semibold">Champions Stats</h2>
    <select className="bg-[#2a2a2e] text-gray-300 text-xs rounded px-2 py-1 hover:bg-[#35353a] transition-colors">
      <option>Normal Draft</option>
      <option>Ranked Solo</option>
      <option>Ranked Flex</option>
    </select>
  </div>
);
