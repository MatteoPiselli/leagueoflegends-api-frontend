// Hook spécialisé pour les calculs purs de match
export const useMatchUtils = () => {
  // Calculate total gold for a team
  const calculateTeamTotalGold = (teamPlayers) => {
    return teamPlayers.reduce(
      (total, player) => total + (player.goldEarned || 0),
      0
    );
  };

  // Calculate gold difference between teams
  const calculateGoldDifference = (blueTeamPlayers, redTeamPlayers) => {
    const blueGold = calculateTeamTotalGold(blueTeamPlayers);
    const redGold = calculateTeamTotalGold(redTeamPlayers);
    return blueGold - redGold;
  };

  return {
    calculateTeamTotalGold,
    calculateGoldDifference,
  };
};
