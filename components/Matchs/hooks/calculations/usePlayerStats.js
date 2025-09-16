// Hook spécialisé pour les calculs purs de statistiques de joueur
export const usePlayerStats = () => {
  // Calculate KDA ratio
  const calculateKDA = (kills, deaths, assists) => {
    if (deaths === 0) return "Perfect";
    return ((kills + assists) / deaths).toFixed(2);
  };

  // Calculate CS and CS per minute
  const calculateCS = (
    totalMinionsKilled,
    neutralMinionsKilled,
    gameDuration
  ) => {
    const cs = totalMinionsKilled + neutralMinionsKilled;
    const csPerMin = (cs / (gameDuration / 60)).toFixed(1);
    return { cs, csPerMin };
  };

  // Calculate damage share percentage
  const calculateDamageShare = (playerDamage, teamTotalDamage) => {
    if (teamTotalDamage === 0) return 0;
    return ((playerDamage / teamTotalDamage) * 100).toFixed(1);
  };

  // Calculate gold efficiency
  const calculateGoldEfficiency = (totalGold, gameDuration) => {
    return (totalGold / (gameDuration / 60)).toFixed(0);
  };

  return {
    calculateKDA,
    calculateCS,
    calculateDamageShare,
    calculateGoldEfficiency,
  };
};
