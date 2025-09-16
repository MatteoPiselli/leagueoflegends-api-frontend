// Hook pour les styles et couleurs d'affichage des masteries
export const useMasteryDisplay = () => {
  // Function to get mastery icon URL
  const getMasteryIconUrl = (championLevel) => {
    const baseUrl = `https://raw.communitydragon.org/latest/game/assets/ux/mastery/legendarychampionmastery/`;

    switch (championLevel) {
      case 4:
        return `${baseUrl}masterycrest_level4_minis.cm_updates.png`;
      case 5:
        return `${baseUrl}masterycrest_level5_minis.cm_updates.png`;
      case 6:
        return `${baseUrl}masterycrest_level6_minis.cm_updates.png`;
      case 7:
        return `${baseUrl}masterycrest_level7_minis.cm_updates.png`;
      case 8:
        return `${baseUrl}masterycrest_level8_minis.cm_updates.png`;
      case 9:
        return `${baseUrl}masterycrest_level9_minis.cm_updates.png`;
      case 10:
        return `${baseUrl}masterycrest_level10_minis.cm_updates.png`;
      default:
        if (championLevel > 10) {
          return `${baseUrl}masterycrest_level10_minis.cm_updates.png`;
        }
        return `${baseUrl}masterycrest_level0_minis.cm_updates.png`;
    }
  };

  return {
    getMasteryIconUrl,
  };
};
