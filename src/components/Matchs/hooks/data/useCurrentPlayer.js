import { useMemo } from "react";

/**
 * Hook to manage current player logic in a match
 */
export const useCurrentPlayer = (match, playerData) => {
  const currentPlayer = useMemo(() => {
    if (
      !match?.matchDetails?.info?.participants ||
      !playerData?.summoner?.puuid
    ) {
      return null;
    }

    return match.matchDetails.info.participants.find(
      (p) => p.puuid === playerData.summoner.puuid
    );
  }, [match?.matchDetails?.info?.participants, playerData?.summoner?.puuid]);

  return currentPlayer;
};
