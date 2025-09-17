// Calculation functions for ranked stats

export const useRankedCalculations = () => {
  // Function to calculate win rate
  const calculateWinRate = (wins, losses) => {
    const totalGames = wins + losses;
    return totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
  };

  // Function to calculate total games
  const calculateTotalGames = (wins, losses) => {
    return wins + losses;
  };

  return {
    calculateWinRate,
    calculateTotalGames,
  };
};
