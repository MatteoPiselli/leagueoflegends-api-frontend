// Utility functions for ranked stats calculations and formatting

export const useRankedCalculations = () => {
  const queueTypes = [
    { key: "RANKED_SOLO_5x5", label: "Ranked Solo/Duo" },
    { key: "RANKED_FLEX_SR", label: "Ranked Flex" },
  ];

  // Function to get rank icon URL
  const getRankIconUrl = (tier) => {
    const baseUrl = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/`;

    switch (tier) {
      case "IRON":
        return `${baseUrl}iron.png`;
      case "BRONZE":
        return `${baseUrl}bronze.png`;
      case "SILVER":
        return `${baseUrl}silver.png`;
      case "GOLD":
        return `${baseUrl}gold.png`;
      case "PLATINUM":
        return `${baseUrl}platinum.png`;
      case "EMERALD":
        return `${baseUrl}emerald.png`;
      case "DIAMOND":
        return `${baseUrl}diamond.png`;
      case "MASTER":
        return `${baseUrl}master.png`;
      case "GRANDMASTER":
        return `${baseUrl}grandmaster.png`;
      case "CHALLENGER":
        return `${baseUrl}challenger.png`;
      default:
        return `${baseUrl}unranked.png`;
    }
  };

  // Function to calculate win rate
  const calculateWinRate = (wins, losses) => {
    const totalGames = wins + losses;
    return totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
  };

  // Function to get rank display name
  const getRankDisplayName = (tier, rank) => {
    if (!tier) return "Unranked";
    if (["MASTER", "GRANDMASTER", "CHALLENGER"].includes(tier)) {
      return tier.charAt(0) + tier.slice(1).toLowerCase();
    }
    return `${tier.charAt(0) + tier.slice(1).toLowerCase()} ${rank}`;
  };

  return {
    queueTypes,
    getRankIconUrl,
    calculateWinRate,
    getRankDisplayName,
  };
};
