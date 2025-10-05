import { useState } from "react";
import { handleHttpError } from "../../utils/errorHandling";

export const usePlayerProfile = () => {
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Search player function
  const searchPlayer = async (username, tagLine) => {
    if (!username || !tagLine) {
      alert("Please enter a valid username and tag line.");
      return null;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/summoner/${username}/${tagLine}`
      );

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setPlayerData(null);
        return null;
      }

      const data = await response.json();

      if (data && data.summoner) {
        setPlayerData(data);
        return data;
      } else {
        throw new Error("Player not found");
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
      setPlayerData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    playerData,
    isLoading,
    searchPlayer,
    setPlayerData,
  };
};
