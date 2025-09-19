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
    return isWin ? "text-sky-500" : "text-red-500";
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
    formatGameDuration,
    formatTimeAgo,
  };
};
