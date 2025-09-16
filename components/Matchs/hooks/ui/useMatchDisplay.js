// Hook pour les styles et couleurs d'affichage des matches
export const useMatchDisplay = () => {
  // Get KDA color based on performance
  const getKDAColor = (kda) => {
    if (kda === "Perfect" || parseFloat(kda) >= 5) return "text-orange-400";
    if (parseFloat(kda) >= 3) return "text-blue-400";
    return "";
  };

  // Get win/loss color
  const getWinLossColor = (isWin) => {
    return isWin ? "text-green-400" : "text-red-400";
  };

  // Get game mode color
  const getGameModeColor = (queueId) => {
    switch (queueId) {
      case 420: // Ranked Solo/Duo
        return "text-yellow-400";
      case 440: // Ranked Flex
        return "text-blue-400";
      case 450: // ARAM
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  // Get rank tier color
  const getRankColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case "iron":
        return "text-gray-400";
      case "bronze":
        return "text-amber-600";
      case "silver":
        return "text-gray-300";
      case "gold":
        return "text-yellow-400";
      case "platinum":
        return "text-cyan-400";
      case "emerald":
        return "text-emerald-400";
      case "diamond":
        return "text-blue-400";
      case "master":
        return "text-purple-400";
      case "grandmaster":
        return "text-red-400";
      case "challenger":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  // Format game duration for display
  const formatGameDuration = (gameDuration) => {
    const minutes = Math.floor(gameDuration / 60);
    const seconds = (gameDuration % 60).toString().padStart(2, "0");
    return `${minutes}m ${seconds}s`;
  };

  // Format time ago display
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const matchTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - matchTime) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return {
    getKDAColor,
    getWinLossColor,
    getGameModeColor,
    getRankColor,
    formatGameDuration,
    formatTimeAgo,
  };
};
