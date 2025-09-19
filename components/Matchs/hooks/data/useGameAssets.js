import { useState, useEffect } from "react";

export const useGameAssets = (latestPatch) => {
  const [runesData, setRunesData] = useState([]);
  const [summonerSpells, setSummonerSpells] = useState([]);
  const [itemsData, setItemsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!latestPatch) return;

    const fetchGameAssets = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all data in parallel
        const [runesResponse, spellsResponse, itemsResponse] =
          await Promise.all([
            fetch(
              `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/runesReforged.json`
            ),
            fetch(
              `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/summoner.json`
            ),
            fetch(
              `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/item.json`
            ),
          ]);

        const [runes, spells, items] = await Promise.all([
          runesResponse.json(),
          spellsResponse.json(),
          itemsResponse.json(),
        ]);

        setRunesData(runes);
        setSummonerSpells(spells.data);
        setItemsData(items.data);
      } catch (err) {
        console.error("Error fetching game assets:", err);
        setError(err.message);
        setRunesData([]);
        setSummonerSpells([]);
        setItemsData({});
      } finally {
        setLoading(false);
      }
    };

    fetchGameAssets();
  }, [latestPatch]);

  return {
    runesData,
    summonerSpells,
    itemsData,
    loading,
    error,
  };
};
