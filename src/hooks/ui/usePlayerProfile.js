import { useState } from "react";
import { handleHttpError } from "../../utils/errorHandling";

export const usePlayerProfile = () => {
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search player function
  const searchPlayer = async (username, tagline, forceUpdate = false) => {
    if (!username || !tagline) {
      setError("Please enter a valid username and tag line.");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = new URL(`${API_URL}/api/summoner/${username}/${tagline}`);
      if (forceUpdate) {
        url.searchParams.set("updateClicked", "true");
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setError(`Error ${response.status}: ${response.statusText}`);
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
      setError("Network error. Please try again later.");
      setPlayerData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    playerData,
    isLoading,
    error,
    searchPlayer,
    setPlayerData,
  };
};
