import { useState } from "react";

export const useMatchExpansion = () => {
  const [expandedMatches, setExpandedMatches] = useState({});

  const toggleMatchDetails = (matchId) => {
    setExpandedMatches((prev) => ({
      ...prev,
      [matchId]: !prev[matchId],
    }));
  };

  const isMatchExpanded = (matchId) => {
    return expandedMatches[matchId] || false;
  };

  const collapseAllMatches = () => {
    setExpandedMatches({});
  };

  return {
    expandedMatches,
    toggleMatchDetails,
    isMatchExpanded,
    collapseAllMatches,
  };
};
