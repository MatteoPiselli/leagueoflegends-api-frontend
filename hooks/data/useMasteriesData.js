import { useState } from "react";
import { handleHttpError } from "../../utils/errorHandling";

export const useMasteriesData = () => {
  const [masteriesData, setMasteriesData] = useState([]);

  // Fetch masteries data
  const fetchMasteriesData = async (puuid, forceUpdate = false) => {
    if (!puuid) {
      setMasteriesData([]);
      return;
    }

    try {
      const url = new URL(`http://localhost:3000/api/masteries/${puuid}`);
      if (forceUpdate) {
        url.searchParams.set("updateClicked", "true");
      }

      const response = await fetch(url.toString());

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
