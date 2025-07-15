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

// ---------- Item Tooltip component ---------- //
const ItemTooltip = ({ latestPatch, item, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!item) return children;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 max-w-sm w-80 shadow-xl">
            {/* Item Image */}
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/item/${item.id}.png`}
              alt={item.name}
              width={40}
              height={40}
            />
            <h4 className="text-yellow-400 font-semibold text-sm mb-1">
              {item.name}
            </h4>
            {item.gold && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-yellow-500">{item.gold.total}g</span>
                {item.gold.sell > 0 && (
                  <span className="text-gray-400">Vend: {item.gold.sell}g</span>
                )}
              </div>
            )}
            {/* Description HTML sans les balises */}
            {item.description && (
              <div
                className="text-xs text-gray-300 mt-2 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: item.description
                    .replace(/<br>/g, "<br/>")
                    .replace(/<stats>/g, '<div class="text-blue-400 mt-1">')
                    .replace(/<\/stats>/g, "</div>")
                    .replace(
                      /<passive>/g,
                      '<div class="text-green-400 mt-1"><strong>Passif:</strong> '
                    )
                    .replace(/<\/passive>/g, "</div>")
                    .replace(
                      /<active>/g,
                      '<div class="text-orange-400 mt-1"><strong>Actif:</strong> '
                    )
                    .replace(/<\/active>/g, "</div>"),
                }}
              />
            )}
          </div>
          {/* Flèche du tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- Team Column component ---------- //
const TeamColumn = ({ players, playerData, latestPatch, teamColor }) => (
  <div className="flex flex-col">
    {players.map((player, index) => (
      <div key={index} className="flex items-center space-x-1">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${player.championName}.png`}
          alt={player.championName}
          width={16}
          height={16}
          className="rounded"
        />
        <span
          className={`text-xs truncate max-w-[80px] ${
            player.puuid === playerData?.summoner?.puuid
              ? "font-bold text-white"
              : teamColor
          }`}
          title={player.riotIdGameName || player.summonerName}
        >
          {(player.riotIdGameName || player.summonerName)?.substring(0, 10)}
        </span>
      </div>
    ))}
  </div>
);

// ---------- Participants component ---------- //
const ParticipantsDisplay = ({ team, playerData, latestPatch }) => (
  <div className={`w-1/2 ${team.id === 100 ? "pr-2" : "pl-2"}`}>
    <h4 className={`text-sm font-semibold ${team.color} mb-2`}>{team.name}</h4>
    {team.players.map((player, index) => (
      <div key={index} className="flex items-center mb-1 text-xs">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${player.championName}.png`}
          alt={player.championName}
          width={20}
          height={20}
          className="rounded"
        />
        <span
          className={`flex-1 truncate ${
            player.puuid === playerData?.summoner?.puuid
              ? "font-bold text-white"
              : "text-gray-400"
          }`}
        >
          {player.riotIdGameName || player.summonerName}
        </span>
        <span className="text-gray-400 ml-2">
          {player.kills}/{player.deaths}/{player.assists}
        </span>
      </div>
    ))}
  </div>
);

export default function Matchs({ matchData, playerData, latestPatch }) {
  const [runesData, setRunesData] = useState([]);
  const [summonerSpells, setSummonerSpells] = useState([]);
  const [itemsData, setItemsData] = useState({});
  const [expandedMatches, setExpandedMatches] = useState({});

  // ---------- Check if matchData is available ---------- //
  if (!matchData || matchData.length === 0) {
    return (
      <div className="w-full flex justify-center items-center border border-[#dd1029] mt-8">
        No match data available
      </div>
    );
  }

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

  // ---------- Render match data ---------- //
  return (
    <div className="container flex flex-col rounded-lg mt-8">
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

        // ---------- Participants data ---------- //
        const participants = match.matchDetails.info.participants.map(
          (player) => ({
            championName: player.championName,
            riotIdGameName: player.riotIdGameName,
            summonerName: player.summonerName,
            puuid: player.puuid,
            teamId: player.teamId,
          })
        );

        // ---------- Teams data ---------- //
        const blueTeam = participants.filter((p) => p.teamId === 100);
        const redTeam = participants.filter((p) => p.teamId === 200);

        const teams = [
          {
            id: 100,
            name: "Blue side",
            color: "text-blue-400",
            players: match.matchDetails.info.participants.filter(
              (p) => p.teamId === 100
            ),
          },
          {
            id: 200,
            name: "Red side",
            color: "text-red-400",
            players: match.matchDetails.info.participants.filter(
              (p) => p.teamId === 200
            ),
          },
        ];

        // --------- Toggle function for expanding match details --------- //
        const toggleMatchDetails = (matchId) => {
          setExpandedMatches((prev) => ({
            ...prev,
            [matchId]: !prev[matchId], // Inverses the state of the match details clicked
          }));
        };

        const isExpanded = expandedMatches[match.matchDetails.metadata.matchId];

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
            <div className="flex items-center justify-between space-x-4 mt-2">
              <div className="flex flex-row items-center space-x-2">
                {/* --------- Display champion's icon --------- */}
                <div className="relative w-[60px] h-[60px] mt-2">
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

                <div className="flex flex-col items-center p-1">
                  <div className="flex items-center">
                    {/* --------- Display rune icons --------- */}
                    {primaryRuneIcon && (
                      <Image
                        src={primaryRuneIcon}
                        alt="Rune Icon"
                        width={24}
                        height={24}
                      />
                    )}

                    {secondaryRuneIcon && (
                      <Image
                        src={secondaryRuneIcon}
                        alt="Rune Icon"
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                  <div className="flex items-center">
                    {/* --------- Display summoner's spells --------- */}
                    {spell1 && (
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/${spell1.id}.png`}
                        alt={spell1.name}
                        width={24}
                        height={24}
                        className="rounded-lg"
                      />
                    )}
                    {spell2 && (
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/${spell2.id}.png`}
                        alt={spell2.name}
                        width={24}
                        height={24}
                        className="rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col text-sm text-center">
                  {/* --------- Display player's KDA --------- */}
                  <p>
                    {currentPlayer.kills}/{currentPlayer.deaths}/
                    {currentPlayer.assists}
                  </p>
                  <p
                    className={`${
                      kda >= 5
                        ? "text-orange-400"
                        : kda >= 3
                        ? "text-blue-400"
                        : ""
                    }`}
                  >
                    {currentPlayer.deaths > 0 ? kda : "Perfect"}{" "}
                    <span className="text-gray-500">KDA</span>
                  </p>
                </div>
              </div>

              {/* --------- Display player's CS --------- */}
              <p className="flex flex-col text-sm text-center">
                {cs} CS
                <span className="text-gray-500">({csPerMin})</span>
              </p>

              {/* --------- Display player's items --------- */}
              <div className="flex flex-wrap gap-1 max-w-[110px] mt-2">
                {playerItems.map((itemId, index) => {
                  if (itemId === 0) {
                    // Empty item slot
                    return (
                      <div
                        key={index}
                        className="w-6 h-6 bg-gray-700 border border-gray-600 rounded"
                      ></div>
                    );
                  }

                  const item = getItemData(itemId);
                  return (
                    <ItemTooltip key={index} item={item}>
                      <div className="relative cursor-pointer hover:scale-110 transition-transform">
                        <Image
                          src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/item/${itemId}.png`}
                          alt={item?.name || "Item"}
                          width={24}
                          height={24}
                          className="rounded border border-gray-600 hover:border-yellow-400 transition-colors"
                        />
                      </div>
                    </ItemTooltip>
                  );
                })}
              </div>

              {/* --------- Display participant teams --------- */}
              <div className="flex items-center space-x-4 flex-1 ml-4">
                <TeamColumn
                  players={blueTeam}
                  playerData={playerData}
                  latestPatch={latestPatch}
                  teamColor="text-blue-400"
                />
                <TeamColumn
                  players={redTeam}
                  playerData={playerData}
                  latestPatch={latestPatch}
                  teamColor="text-red-400"
                />
              </div>

              {/* Toggle button */}
              <button
                onClick={() =>
                  toggleMatchDetails(match.matchDetails.metadata.matchId)
                }
                className="ml-4 p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* ------------- Detailed teams view -------------- */}
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-gray-500">
                <div className="flex justify-between">
                  {teams.map((team) => (
                    <ParticipantsDisplay
                      key={team.id}
                      team={team}
                      playerData={playerData}
                      latestPatch={latestPatch}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
