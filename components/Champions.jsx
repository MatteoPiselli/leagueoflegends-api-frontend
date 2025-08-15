import Image from "next/image";
import { useState, useEffect } from "react";

export default function Champions({
  playerData,
  latestPatch,
  getChampionName,
}) {
  const [championStats, setChampionStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------- Function to fetch champion stats ---------- //
  const fetchChampionStats = async () => {
    if (!playerData?.summoner?.puuid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/matchs/champion-stats/${playerData.summoner.puuid}`
      );
      const data = await response.json();
      setChampionStats(data.championStats);
    } catch (error) {
      console.error("Error fetching champion stats:", error);
      setError("Error champions stats. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChampionStats();
  }, []);

  const getKdaColor = (kda) => {
    if (kda >= 5) return "text-orange-400";
    if (kda >= 3) return "text-blue-400";
  };

  const getWinRateColor = (winRate) => {
    if (winRate >= 60) return "text-orange-400";
    if (winRate >= 50) return "text-blue-400";
    if (winRate < 50) return "text-red-400";
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-fit w-full p-4 bg-[#19191B] rounded-lg">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#dd1029]">
          <h2 className="text-base text-white font-semibold">
            Champions Stats
          </h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <Image
            src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-search-empty-poro.svg"
            alt="Loading poro"
            width={40}
            height={40}
            className="animate-pulse"
          />
          <span className="ml-3 text-gray-400 text-sm">
            Loading statistics...
          </span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-fit w-full p-4 bg-[#19191B] rounded-lg">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#dd1029]">
          <h2 className="text-base text-white font-semibold">
            Champions Stats
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-400 mb-4 text-sm">{error}</p>
          <button
            onClick={fetchChampionStats}
            className="px-4 py-2 bg-[#dd1029] text-white text-sm rounded hover:bg-[#b91027] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ---------- Dsiplay champion stats ---------- //
  return (
    <div className="h-fit w-full p-4 bg-[#19191B] rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#dd1029]">
        <h2 className="text-base text-white font-semibold">Champions Stats</h2>
        <span className="text-xs text-gray-400">Top 3 recent</span>
      </div>

      {/* ---------- Champions List ---------- */}
      {championStats?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No statistics available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {championStats.map((champion) => (
            <div
              key={champion.championId}
              className="flex items-center justify-between p-3 bg-[#1e1e20] rounded-lg hover:bg-[#25252a] transition-colors"
            >
              {/* ---------- Champion Info ---------- */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${getChampionName(
                        champion.championId
                      )}.png`}
                      alt={champion.championName}
                      width={48}
                      height={48}
                      className="scale-[1.2]"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">
                    {champion.championName}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {champion.games} games
                  </p>
                </div>
              </div>

              {/* ------------------------ Stats ------------------------ */}
              <div className="flex flex-col items-end space-y-1">
                {/* ---------- KDA ---------- */}
                <div className="flex items-center space-x-2">
                  <span
                    className={`font-semibold text-sm ${getKdaColor(
                      champion.averageStats.kda
                    )}`}
                  >
                    {champion.averageStats.kda}
                  </span>
                  <span className="text-gray-400 text-xs">KDA</span>
                </div>

                {/* ---------- Win Rate ---------- */}
                <div className="flex items-center space-x-2">
                  <span
                    className={`font-semibold text-sm ${getWinRateColor(
                      champion.winRate
                    )}`}
                  >
                    {champion.winRate}%
                  </span>
                  <span className="text-gray-400 text-xs">WR</span>
                </div>

                {/* ---------- Detailled KDA ---------- */}
                <div className="text-gray-400 text-xs">
                  {champion.averageStats.kills} / {champion.averageStats.deaths}{" "}
                  / {champion.averageStats.assists}
                </div>

                {/* ---------- CS ---------- */}
                <div className="text-gray-400 text-xs">
                  {champion.averageStats.cs} CS
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ------------ Refresh Button ------------ */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <button
          onClick={fetchChampionStats}
          disabled={loading}
          className="w-full py-2 px-4 bg-[#2a2a2e] text-gray-300 text-xs rounded hover:bg-[#35353a] transition-colors disabled:opacity-50"
        >
          {loading ? "Updating..." : "Refresh Stats"}
        </button>
      </div>
    </div>
  );
}
