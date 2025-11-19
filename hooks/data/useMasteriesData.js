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
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = new URL(`${API_URL}/api/masteries/${puuid}`);
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

  return {
    masteriesData,
    fetchMasteriesData,
    setMasteriesData,
  };
};
