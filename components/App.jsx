// Import React
import { useState, useEffect } from "react";
// Import Next
import Image from "next/image";
// Components
import Ranked from "./Ranked";
import Matchs from "./Matchs/Matchs";
import Champions from "./Champions/Champions";
import Masteries from "./Masteries";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
// Icons
import { History } from "lucide-react";
import { X } from "lucide-react";

export default function App() {
  // Input states for username and tag line
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [tagLine, setTagLine] = useState("");
  // Player data state
  const [playerData, setPlayerData] = useState(null);
  const [championData, setChampionData] = useState({});
  const [rankedData, setRankedData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [masteriesData, setMasteriesData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [latestPatch, setLatestPatch] = useState("");

  const [region, setRegion] = useState(false);
  const toggleDropdown = () => setRegion(!region);

  // Function to handle HTTP errors
  const handleHttpError = (status, statusText) => {
    let message;

    switch (status) {
      case 400:
        message = "Bad Request: Please check your input.";
        break;
      case 401:
        message = "Unknown API key: Please check your API key.";
        break;
      case 404:
        message = "Player not found. Please check the username and tag.";
        break;
      case 403:
        message =
          "Forbidden: You do not have permission to access this resource. Please check your API key";
        break;
      case 429:
        message =
          "Too Many Requests. You have exceeded the rate limit for this API. Please try again in 1 minute.";
        break;
      case 500:
        message = "Internal Server Error. Please try again later.";
        break;
      default:
        message = `Unknown error (Code ${status}). Please try again later.`;
    }

    console.error(`HTTP Error ${status}: ${message}`);
    alert(`Error: ${status}${"\n\n"} ${message}`);
    return false;
  };

  // ---------- Function to fetch champion data ---------- //
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
    } catch (error) {
      console.error("Error fetching champion data:", error);
      setChampionData({});
    }
  };

  // ---------- Function to get champion name by champion ID ---------- //
  const getChampionName = (championId) => {
    return championData[championId] || championId;
  };

  // ---------- Get latest patch version ---------- //
  const getLatestPatchVersion = async () => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/api/versions.json"
      );
      const versions = await response.json();
      setLatestPatch(versions[0]);
    } catch (error) {
      console.error("Error fetching patch version:", error);
      return null;
    }
  };

  // ---------- Fetch latest patch version and champion data on component mount ---------- //
  useEffect(() => {
    const initializeData = async () => {
      await getLatestPatchVersion();
    };
    initializeData();
  }, []);

  // ---------- Fetch champion data when latestPatch is available ---------- //
  useEffect(() => {
    if (latestPatch) {
      fetchChampionData(latestPatch);
    }
  }, [latestPatch]);

  // -------------------  Search player function ----------------- //
  const searchPlayer = async (riotIdGameName, riotIdTagline) => {
    // If no parameters are provided, use the input values
    const usernameParams = riotIdGameName || username;
    const tagLineParams = riotIdTagline || tagLine;

    if (!usernameParams || !tagLineParams) {
      alert("Please enter a valid username and tag line.");
      return;
    }

    setIsLoading(true);
    // ---------- Search player ---------- //
    try {
      const response = await fetch(
        `http://localhost:3000/summoner/${usernameParams}/${tagLineParams}`
      );

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setPlayerData(null);
        return;
      }

      const data = await response.json();

      // ---------- Check if response is valid ---------- //
      if (data && data.summoner) {
        setPlayerData(data);

        // Add to the history only if success
        setHistory((prev) => {
          const newEntry = {
            username: usernameParams,
            tagLine: tagLineParams,
          };
          // Check if the entry already exists in history
          const filtered = prev.filter(
            (item) =>
              item.username !== usernameParams && item.tagLine !== tagLineParams
          );
          return [...filtered, newEntry];
        });
      } else {
        throw new Error("Player not found");
      }

      // ---------- Fetch ranked data ---------- //
      if (data.summoner && data.summoner.puuid) {
        const response = await fetch(
          `http://localhost:3000/ranked/${data.summoner.puuid}`
        );
        const ranked = await response.json();
        setRankedData(ranked.ranked);
      } else {
        setRankedData([]);
      }

      // ---------- Fetch matchs data ---------- //
      if (data.summoner && data.summoner.puuid) {
        const response = await fetch(
          `http://localhost:3000/matchs/${data.summoner.puuid}`
        );
        const matchs = await response.json();

        // ---------- Fetch matchs details ---------- //
        const details = await Promise.all(
          // Promise.all to fetch match details concurrently
          (Array.isArray(matchs.matchs) ? matchs.matchs : []).map(
            async (matchId) => {
              const res = await fetch(
                `http://localhost:3000/matchs/details/${matchId}`
              );
              return await res.json();
            }
          )
        );
        setMatchData(details);
      } else {
        setMatchData([]);
      }

      // ---------- Fetch masteries data ---------- //
      if (data.summoner && data.summoner.puuid) {
        const response = await fetch(
          `http://localhost:3000/masteries/${data.summoner.puuid}`
        );
        const masteries = await response.json();
        setMasteriesData(masteries.masteries);
      } else {
        setMasteriesData([]);
      }
    } catch (error) {
      // ---------- Errors ---------- //
      console.error("Error fetching player data:", error);
      setPlayerData(null);
    } finally {
      // ------- Reset input value after search ------- //
      setInputValue("");
      setUsername("");
      setTagLine("");
      setIsLoading(false);
    }
  };

  // ------------------- Retry Matches function ----------------- //
  const retryMatches = async () => {
    if (!playerData?.summoner?.puuid) {
      console.warn("No player data available for retry");
      return;
    }
    try {
      // ---------- Fetch matchs data ---------- //
      const response = await fetch(
        `http://localhost:3000/matchs/${playerData.summoner.puuid}`
      );

      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setMatchData([]);
        return;
      }

      const matchs = await response.json();

      // ---------- Fetch matchs details ---------- //
      const details = await Promise.all(
        (Array.isArray(matchs.matchs) ? matchs.matchs : []).map(
          async (matchId) => {
            const res = await fetch(
              `http://localhost:3000/matchs/details/${matchId}`
            );
            return await res.json();
          }
        )
      );
      setMatchData(details);
    } catch (error) {
      console.error("Error retrying match data:", error);
      setMatchData([]);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* ----- Background Image ----- */}
      <div className="z-10 w-full h-full bg-black opacity-35 absolute inset-0" />
      <Image src="/background.jpg" alt="Background" layout="fill" />

      {/* ----------------------- Main Container ----------------------- */}
      <div className="z-20 container max-w-5xl mx-auto px-8 absolute inset-0 bg-[#121212] rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[#DD1029] scrollbar-track-[#121212]">
        <div className="flex justify-center mt-8">
          {/* ----- Icon Logo -----*/}
          <Image
            priority={true}
            src="/logo.png"
            alt="logo SummonerFinder.gg"
            width={300}
            height={110}
          />
        </div>

        {/* ----- Region and Username Input -----*/}
        <div className="relative flex flex-row items-start justify-center mt-12">
          {/* Button for region selection */}
          <button
            onClick={toggleDropdown}
            className="w-32 bg-[#19191B] text-white py-2"
          >
            EUW
            {/* -------- Dropdown for regions -------*/}
            <AnimatePresence>
              {region && (
                <motion.div
                  className="absolute top-full w-32 bg-[#19191B]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="py-1">
                    <li className="border-b border-[#DD1029] px-4 py-2 hover:bg-[#292A2E] cursor-pointer">
                      Region 1
                    </li>
                    <li className="border-b border-[#DD1029] px-4 py-2 hover:bg-[#292A2E] cursor-pointer">
                      Region 2
                    </li>
                    <li className="border-b border-[#DD1029] px-4 py-2 hover:bg-[#292A2E] cursor-pointer">
                      Region 3
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* ------- Input for username and tag line ---------*/}

          <div className="relative flex flex-col items-center">
            <input
              type="text"
              placeholder="Username#tagLine"
              className="bg-[#19191B] w-96 text-white p-2"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);

                // Split the input into username and tag line
                const [name, tag] = value.split("#");
                setUsername(name || "");
                setTagLine(tag || "");
              }}
              /* View history of searches */
              onClick={() => setIsHistoryVisible((prev) => !prev)}
            />

            {/* ------------- History of searches ------------- */}
            <AnimatePresence>
              {isHistoryVisible && (
                <motion.div
                  className="absolute top-full left-0 w-96 bg-[#19191B] text-white rounded-b-lg shadow-lg mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: -7 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {history.length > 0 ? (
                    // ----------- Display if history is not empty ----------- //
                    <ul className="max-h-60 overflow-y-auto">
                      {history
                        .slice(-5)
                        .reverse()
                        .map((player, index) => {
                          return (
                            <li
                              key={index}
                              className="relative flex items-center px-4 py-2 hover:bg-[#292A2E] cursor-pointer"
                            >
                              <History className="inline mr-2 w-4 h-4" />
                              <div
                                className="flex-1"
                                onClick={() => {
                                  searchPlayer(player.username, player.tagLine);
                                  setIsHistoryVisible(false);
                                }}
                              >
                                {player.username}#{player.tagLine}
                              </div>
                              <X
                                className="w-4 h-4 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setHistory((prev) =>
                                    prev.filter(
                                      (item) =>
                                        item.username !== player.username &&
                                        item.tagLine !== player.tagLine
                                    )
                                  );
                                }}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  ) : (
                    // --------- Display poro icon and message if history is empty --------- //
                    <div className="flex flex-col items-center justify-center py-8">
                      <Image
                        src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-search-empty-poro.svg"
                        alt="Poro icon"
                        width={70}
                        height={70}
                      />
                      <p className="text-gray-400 text-sm mt-3">
                        No recent researches
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Your searches will appear here
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ------- Button to search player -------*/}
          <button
            onClick={() => {
              setIsHistoryVisible(false);
              searchPlayer(username, tagLine);
            }}
            className="bg-[#19191B] hover:bg-[#292A2E] px-4 py-2"
          >
            Search
          </button>
        </div>

        {isLoading ? (
          // ------ Loader while fetching data ----- //
          <div className="flex justify-center items-center h-96">
            <Image
              src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-sleeping-poro.png"
              alt="Poro sleeping"
              width={70}
              height={70}
              className="animate-pulse"
            />
            <p className="ml-4 text-white">Loading data...</p>
          </div>
        ) : // ------ Display player data ----- //
        playerData ? (
          <>
            <div className="flex items-center">
              <div className="relative mt-8 h-[125px]">
                {/* Icon of the player */}
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/profileicon/${playerData.summoner.profileIconId}.png`}
                  alt="Profile Icon"
                  width={110}
                  height={110}
                  className="rounded-xl"
                />
                {/* Level of the player */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white rounded-xl py-1 px-2 text-sm">
                  {playerData.summoner.summonerLevel}
                </div>
              </div>
              {/* Username and Tag Line */}
              <div className="ml-4 text-xl">
                <span className="font-bold">{playerData.riotId.gameName}</span>
                <span className="text-gray-500">
                  #{playerData.riotId.tagLine}
                </span>
              </div>
            </div>
            {/* ------- Components ------- */}
            <div className="flex space-x-6 mt-6">
              <div className="flex flex-col space-y-6 w-1/3 mb-16">
                <Ranked rankedData={rankedData} />
                <Champions
                  playerData={playerData}
                  latestPatch={latestPatch}
                  getChampionName={getChampionName}
                />
                <Masteries
                  latestPatch={latestPatch}
                  masteriesData={masteriesData}
                  getChampionName={getChampionName}
                />
              </div>
              <div className="w-2/3">
                <Matchs
                  latestPatch={latestPatch}
                  playerData={playerData}
                  matchData={matchData}
                  searchPlayer={searchPlayer}
                  getChampionName={getChampionName}
                  retryMatches={retryMatches}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
