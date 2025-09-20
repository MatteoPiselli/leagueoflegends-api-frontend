import { useState } from "react";
import { handleHttpError } from "../../utils/errorHandling";

export const useMasteriesData = () => {
  const [masteriesData, setMasteriesData] = useState([]);

  // Fetch masteries data
  const fetchMasteriesData = async (puuid) => {
    if (!puuid) {
      setMasteriesData([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/masteries/${puuid}`
      );

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setMasteriesData([]);
        return;
      }

      const masteries = await response.json();
      setMasteriesData(masteries.masteries || []);
    } catch (error) {
      console.error("Error fetching masteries data:", error);
      setMasteriesData([]);
    }
  };

  // Retry masteries function
  const retryMasteries = async (puuid) => {
    if (!puuid) {
      console.warn("No PUUID available for retry");
      return;
    }

    await fetchMasteriesData(puuid);
  };

  return {
    masteriesData,
    fetchMasteriesData,
    retryMasteries,
    setMasteriesData,
  };
};
