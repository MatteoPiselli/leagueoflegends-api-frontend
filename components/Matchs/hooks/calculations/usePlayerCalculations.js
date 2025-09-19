// Hook spécialisé pour les calculs de statistiques de joueur
export const usePlayerCalculations = () => {
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

  return {
    calculateKDA,
    calculateCS,
  };
};
