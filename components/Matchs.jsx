import { useState, useEffect } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const queueId = {
  400: "Normal Draft",
  420: "Ranked Solo/Duo",
  430: "Normal Blind Pick",
  440: "Ranked Flex",
  450: "ARAM",
  700: "Clash",
  720: "ARAM Clash",
  900: "AURF",
  1090: "Teamfight Tactics",
  1100: "Ranked TFT",
  1700: "Arena",
  1710: "Arena",
  2000: "Tutorial",
  2010: "Tutorial",
  2020: "Tutorial",
};

export default function Matchs({ matchData, playerData, latestPatch }) {
  const [runesData, setRunesData] = useState([]);
  const [summonerSpells, setSummonerSpells] = useState([]);
  const [itemsData, setItemsData] = useState({});

  useEffect(() => {
    // ---------- Function to fetch runes datas ---------- //
    const fetchRunesData = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/runesReforged.json`
        );
        const runes = await response.json();
        setRunesData(runes);
      } catch (error) {
        console.error("Error fetching runes data:", error);
        setRunesData([]);
      }
    };

    // ---------- Function to fetch summoner spells data ---------- //
    const fetchSummonerSpells = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/summoner.json`
        );
        const summonerSpellsData = await response.json();
        setSummonerSpells(summonerSpellsData.data);
      } catch (error) {
        console.error("Error fetching summoner spells data:", error);
        setSummonerSpells({});
      }
    };

    // ---------- Function to fetch items data ---------- //
    const fetchItemsData = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/item.json`
        );
        const itemsResponse = await response.json();
        setItemsData(itemsResponse.data);
      } catch (error) {
        console.error("Error fetching items data:", error);
        setItemsData({});
      }
    };

    if (latestPatch) {
      fetchRunesData();
      fetchSummonerSpells();
      fetchItemsData();
    }
  }, [latestPatch]);

  // ---------- Function to get rune icons by rune ID ---------- //
  const getRuneIcon = (runeId) => {
    for (const tree of runesData) {
      for (const slot of tree.slots) {
        for (const rune of slot.runes) {
          if (rune.id === runeId) {
            return `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
          }
        }
      }
    }
    return null; // Return null if rune not found
  };

  // ---------- Function to get rune tree icon by tree ID ---------- //
  const getRuneTreeIcon = (treeId) => {
    for (const tree of runesData) {
      if (tree.id === treeId) {
        return `https://ddragon.leagueoflegends.com/cdn/img/${tree.icon}`;
      }
    }
    return null; // Return null if tree not found
  };

  // ---------- Function to get summoner spell name by spell ID ---------- //
  const getSummonerSpell = (spellId) => {
    return Object.values(summonerSpells).find(
      (spell) => spell.key === String(spellId)
    );
  };

  // ---------- Function to get item data by item ID ---------- //
  const getItemData = (itemId) => {
    return itemsData[itemId] || null;
  };

  // ---------- Check if matchData is available ---------- //
  if (!matchData || matchData.length === 0) {
    return (
      <div className="w-full flex justify-center items-center border border-[#dd1029] mt-8">
        No match data available
      </div>
    );
  }

  // ---------- Render match data ---------- //
  return (
    <div className="w-full flex flex-col rounded-lg mt-8">
      {matchData.map((match) => {
        // ---------- Find data for the current player ---------- //
        const currentPlayer = match.matchDetails.info.participants.find(
          (p) => p.puuid === playerData?.summoner?.puuid
        );
        console.log("currentPlayer", currentPlayer);

        // ------- Find the primary rune icon for the current player ------- //
        const primaryRuneIcon = getRuneIcon(
          currentPlayer?.perks?.styles?.[0]?.selections?.[0]?.perk
        );

        // ------- Find the secondary rune icon for the current player ------- //
        const secondaryRuneIcon = getRuneTreeIcon(
          currentPlayer?.perks?.styles?.[1]?.style
        );

        // ------- Get summoner spells for the current player ------- //
        const spell1 = getSummonerSpell(currentPlayer.summoner1Id);
        const spell2 = getSummonerSpell(currentPlayer.summoner2Id);

        // ---------- KDA calculation ---------- //
        const kda = (
          (currentPlayer.kills + currentPlayer.assists) /
          Math.max(1, currentPlayer.deaths)
        ).toFixed(2);

        // ---------- CS calculation ---------- //
        const cs =
          currentPlayer.totalMinionsKilled + currentPlayer.neutralMinionsKilled;

        // ---------- CS/min calculation ---------- //
        const csPerMin = (
          (currentPlayer.totalMinionsKilled +
            currentPlayer.neutralMinionsKilled) /
          (match.matchDetails.info.gameDuration / 60)
        ).toFixed(1);

        // ---------- Get player's items ---------- //
        const playerItems = [
          currentPlayer.item0,
          currentPlayer.item1,
          currentPlayer.item2,
          currentPlayer.item6, // Trinket
          currentPlayer.item3,
          currentPlayer.item4,
          currentPlayer.item5,
        ];

        return (
          <div
            key={match.matchDetails.metadata.matchId}
            className="bg-[#19191B] rounded-lg pl-4 pr-4 pt-2 pb-2 mb-4"
          >
            {/* ------------------------------  Match infos -------------------------- */}
            <div className="flex items-center justify-between border-b border-[#dd1029]">
              <div className="mb-2">
                {/* -------- Queue type & Victory/Defeat-------*/}
                <h3>
                  {queueId[match.matchDetails.info.queueId] || "Unknown Queue"}
                </h3>
                <p>
                  {currentPlayer?.win ? (
                    <span className="text-sky-500">Victory</span>
                  ) : (
                    <span className="text-red-500">Defeat</span>
                  )}
                </p>
              </div>
              <div className="mb-2">
                {/* --------- Match duration & Match date --------- */}
                <p>
                  {Math.floor(match.matchDetails.info.gameDuration / 60)}m{" "}
                  {(match.matchDetails.info.gameDuration % 60)
                    .toString()
                    .padStart(2, "0")}
                  s
                </p>
                <p>
                  {formatDistanceToNow(
                    new Date(match.matchDetails.info.gameCreation),
                    { addSuffix: true }
                  ).replace("about", "")}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {/* --------- Display champion's icon --------- */}
              <div className="relative w-[60px] h-[60px] mt-4">
                <div className="flex items-center space-x-4 rounded-md overflow-hidden w-[50px] h-[50px]">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${currentPlayer.championName}.png`}
                    alt={currentPlayer.championName}
                    width={50}
                    height={50}
                    className="scale-[1.2]"
                  />
                  {/* --------- Display champion's level --------- */}
                  <span className="absolute right-0 bottom-0 bg-[#121212] text-white text-xs p-1 rounded-full">
                    {currentPlayer.champLevel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center">
                  {/* --------- Display rune icons --------- */}
                  {primaryRuneIcon && (
                    <Image
                      src={primaryRuneIcon}
                      alt="Rune Icon"
                      width={30}
                      height={30}
                    />
                  )}

                  {secondaryRuneIcon && (
                    <Image
                      src={secondaryRuneIcon}
                      alt="Rune Icon"
                      width={26}
                      height={26}
                    />
                  )}
                </div>
                <div className="flex items-center">
                  {/* --------- Display summoner's spells --------- */}
                  {spell1 && (
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/${spell1.id}.png`}
                      alt={spell1.name}
                      width={30}
                      height={30}
                      className="rounded-lg"
                    />
                  )}
                  {spell2 && (
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/${spell2.id}.png`}
                      alt={spell2.name}
                      width={30}
                      height={30}
                      className="rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center">
                {/* --------- Display player's KDA --------- */}
                <p>
                  {currentPlayer.kills}/{currentPlayer.deaths}/
                  {currentPlayer.assists}
                </p>
                <p className={`${kda >= 5 ? "text-orange-400" : ""}`}>
                  {kda} KDA
                </p>
              </div>

              {/* --------- Display player's CS --------- */}
              <p className="flex flex-col">
                {cs} CS<span className="text-gray-500">({csPerMin})</span>
              </p>

              {/* --------- Display player's items --------- */}
              <div className="flex flex-wrap gap-1 max-w-[140px] mt-2">
                {playerItems.map((itemId, index) => {
                  if (itemId === 0) {
                    // Empty item slot
                    return (
                      <div
                        key={index}
                        className="w-8 h-8 bg-gray-700 border border-gray-600 rounded"
                      ></div>
                    );
                  }

                  const item = getItemData(itemId);
                  return (
                    <div key={index} className="relative">
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/item/${itemId}.png`}
                        alt={item?.name || "Item"}
                        width={32}
                        height={32}
                        className="rounded border border-gray-600"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
