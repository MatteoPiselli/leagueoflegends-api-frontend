// Helper functions pour les runes
export const useRuneUtils = (runesData) => {
  const getRuneData = (runeId) => {
    const foundRune = runesData
      .flatMap((tree) => tree.slots || [])
      .flatMap((slot) => slot.runes || [])
      .find((rune) => rune.id === runeId);

    return foundRune
      ? {
          ...foundRune,
          icon: `https://ddragon.leagueoflegends.com/cdn/img/${foundRune.icon}`,
        }
      : null;
  };

  const getRuneTreeData = (treeId) => {
    const foundTree = runesData.find((tree) => tree.id === treeId);

    return foundTree
      ? {
          ...foundTree,
          icon: `https://ddragon.leagueoflegends.com/cdn/img/${foundTree.icon}`,
        }
      : null;
  };

  return {
    getRuneData,
    getRuneTreeData,
  };
};
