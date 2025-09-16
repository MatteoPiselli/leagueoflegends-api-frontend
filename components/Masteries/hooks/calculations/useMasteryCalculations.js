// Utility functions for mastery calculations

export const useMasteryCalculations = () => {
  // Function to format mastery points
  const formatMasteryPoints = (points) => {
    if (points >= 1000000) {
      return `${(points / 1000000).toFixed(1)}M`;
    }
    if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}K`;
    }
    return points.toLocaleString();
  };

  return {
    formatMasteryPoints,
  };
};
