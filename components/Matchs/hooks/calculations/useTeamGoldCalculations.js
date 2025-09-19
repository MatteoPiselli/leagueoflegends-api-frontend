// Hook spécialisé pour les calculs d'or des équipes
export const useTeamGoldCalculations = () => {
  // Calculate total gold for a team
  const calculateTeamTotalGold = (teamPlayers) => {
    return teamPlayers.reduce(
      (total, player) => total + (player.goldEarned || 0),
      0
    );
  };

  // Calculate total gold for both teams
  const calculateTeamGolds = (blueTeamPlayers, redTeamPlayers) => {
    const blueGold = calculateTeamTotalGold(blueTeamPlayers);
    const redGold = calculateTeamTotalGold(redTeamPlayers);
    return { blueGold, redGold };
  };

  return {
    calculateTeamTotalGold,
    calculateTeamGolds,
  };
};
