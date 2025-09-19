// Hook pour la transformation et extraction de données des matches
export const useMatchData = () => {
  // Get player items array
  const getPlayerItems = (player) => {
    return [
      player.item0,
      player.item1,
      player.item2,
      player.item6, // Trinket
      player.item3,
      player.item4,
      player.item5,
    ];
  };

  // Get player gold information
  const getPlayerGold = (player) => {
    return {
      goldEarned: player.goldEarned || 0,
    };
  };

  // Extract player data from match
  const extractPlayerData = (match, playerPuuid) => {
    const participants = match.matchDetails.info.participants;
    return participants.find((p) => p.puuid === playerPuuid);
  };

  // Get team composition
  const getTeamComposition = (participants, teamId) => {
    return participants.filter((p) => p.teamId === teamId);
  };

  // Process match participants for display
  const processParticipants = (participants) => {
    return participants.map((player) => ({
      championName: player.championName,
      championId: player.championId,
      riotIdGameName: player.riotIdGameName,
      riotIdTagline: player.riotIdTagline,
      puuid: player.puuid,
      teamId: player.teamId,
    }));
  };

  // Split participants into teams with metadata
  const splitTeams = (participants) => {
    const blueTeam = participants.filter((p) => p.teamId === 100);
    const redTeam = participants.filter((p) => p.teamId === 200);

    return {
      blueTeam,
      redTeam,
      teams: [
        {
          id: 100,
          name: "Blue side",
          color: "text-blue-400",
          players: blueTeam,
        },
        {
          id: 200,
          name: "Red side",
          color: "text-red-400",
          players: redTeam,
        },
      ],
    };
  };

  return {
    getPlayerItems,
    getPlayerGold,
    extractPlayerData,
    getTeamComposition,
    processParticipants,
    splitTeams,
  };
};
