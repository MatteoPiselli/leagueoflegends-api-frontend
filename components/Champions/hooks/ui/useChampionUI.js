// UI-related hooks for champion components

import { useState } from "react";

/**
 * Hook for managing champion card interactions and UI state
 */
export const useChampionUI = () => {
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);

  const toggleCardExpansion = (championId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(championId)) {
      newExpanded.delete(championId);
    } else {
      newExpanded.add(championId);
    }
    setExpandedCards(newExpanded);
  };

  const handleCardHover = (championId) => {
    setHoveredCard(championId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const isCardExpanded = (championId) => {
    return expandedCards.has(championId);
  };

  const isCardHovered = (championId) => {
    return hoveredCard === championId;
  };

  return {
    expandedCards,
    hoveredCard,
    toggleCardExpansion,
    handleCardHover,
    handleCardLeave,
    isCardExpanded,
    isCardHovered,
  };
};
