import { useState, useEffect } from "react";

export const useChampionData = () => {
  const [championData, setChampionData] = useState({});
  const [latestPatch, setLatestPatch] = useState("");

  // Get latest patch version
  const getLatestPatchVersion = async () => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/api/versions.json"
      );
      const versions = await response.json();
      setLatestPatch(versions[0]);
      return versions[0];
    } catch (error) {
      console.error("Error fetching patch version:", error);
      return null;
    }
  };

  // Function to fetch champion data
  const fetchChampionData = async (patch) => {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`
      );
      const data = await response.json();
      const champions = data.data;

      const championMap = {};
      Object.values(champions).forEach((champion) => {
        championMap[champion.key] = champion.id;
      });
      setChampionData(championMap);
      return championMap;
    } catch (error) {
      console.error("Error fetching champion data:", error);
      setChampionData({});
      return {};
    }
  };

  // Function to get champion name by champion ID
  const getChampionName = (championId) => {
    return championData[championId] || championId;
  };

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      await getLatestPatchVersion();
    };
    initializeData();
  }, []);

  // Fetch champion data when latestPatch is available
  useEffect(() => {
    if (latestPatch) {
      fetchChampionData(latestPatch);
    }
  }, [latestPatch]);

  return {
    championData,
    latestPatch,
    getChampionName,
    fetchChampionData,
    getLatestPatchVersion,
  };
};
