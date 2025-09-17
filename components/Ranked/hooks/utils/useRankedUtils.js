// Utility functions for ranked formatting and display
import { HIGH_TIER_RANKS, RANK_TIERS } from "../data/rankedData";

export const useRankedUtils = () => {
  // Function to get rank icon URL
  const getRankIconUrl = (tier) => {
    const baseUrl = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/`;

    // Check if tier is valid
    if (RANK_TIERS.includes(tier)) {
      return `${baseUrl}${tier.toLowerCase()}.png`;
    }

    // Default unranked
    return `${baseUrl}unranked.png`;
  };

  // Function to get rank display name
  const getRankDisplayName = (tier, rank) => {
    if (!tier) return "Unranked";

    if (HIGH_TIER_RANKS.includes(tier)) {
      return tier.charAt(0) + tier.slice(1).toLowerCase();
    }

    return `${tier.charAt(0) + tier.slice(1).toLowerCase()} ${rank}`;
  };

  return {
    getRankIconUrl,
    getRankDisplayName,
  };
};
