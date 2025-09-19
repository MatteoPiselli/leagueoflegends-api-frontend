// Helper functions pour les sorts d'invocateur
export const useSpellUtils = (summonerSpells) => {
  const getSummonerSpell = (spellId) => {
    return Object.values(summonerSpells).find(
      (spell) => spell.key === String(spellId)
    );
  };

  return {
    getSummonerSpell,
  };
};
