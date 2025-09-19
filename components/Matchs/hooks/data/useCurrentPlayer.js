import { useMemo } from 'react';

/**
 * Hook pour gérer la logique du joueur actuel dans un match
 */
export const useCurrentPlayer = (match, playerData) => {
  const currentPlayer = useMemo(() => {
    if (!match?.matchDetails?.info?.participants || !playerData?.summoner?.puuid) {
      return null;
    }
    
    return match.matchDetails.info.participants.find(
      (p) => p.puuid === playerData.summoner.puuid
    );
  }, [match?.matchDetails?.info?.participants, playerData?.summoner?.puuid]);

  return currentPlayer;
};