// Import Next
import Image from "next/image";
// Components
import Ranked from "./Ranked";
import Matchs from "./Matchs";
// Other imports
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [region, setRegion] = useState(false);
  // Input states for username and tag line
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [tagLine, setTagLine] = useState("");
  // Player data state
  const [playerData, setPlayerData] = useState(null);
  const [rankedData, setRankedData] = useState([]);
  const [matchData, setMatchData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [latestPatch, setLatestPatch] = useState("");

  const toggleDropdown = () => setRegion(!region);

  console.log("matchData:", matchData);

  // -------------------  Search player function ----------------- //
  const searchPlayer = async () => {
    if (username && tagLine) {
      setIsLoading(true);
      // ---------- Search player ---------- //
      try {
        const response = await fetch(
          `http://localhost:3000/summoner/${username}/${tagLine}`
        );
        const data = await response.json();
        console.log("Player data:", data);
        setPlayerData(data);

        // ---------- Fetch ranked data ---------- //
        if (data.summoner && data.summoner.puuid) {
          const response = await fetch(
            `http://localhost:3000/ranked/${data.summoner.puuid}`
          );
          const ranked = await response.json();
          console.log("Ranked data:", ranked);
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
          console.log("Match details:", details);
          setMatchData(details);
        } else {
          setMatchData([]);
        }
      } catch (error) {
        console.error("Error fetching player data:", error);
        setPlayerData(null);
        setRankedData([]);
      } finally {
        // ------- Reset input value after search ------- //
        setInputValue("");
        setUsername("");
        setTagLine("");
        setIsLoading(false);
      }
    } else {
      console.error("Please enter a valid username and tag line.");
    }
  };

  // ---------- Get lasted patch version ---------- //
  const getLatestPatchVersion = async () => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/api/versions.json"
      );
      const versions = await response.json();
      setLatestPatch(versions[0]); // Get the latest patch version
    } catch (error) {
      console.error("Error fetching patch version:", error);
      return null;
    }
  };

  // ---------- Fetch latest patch version on component mount ---------- //
  useEffect(() => {
    getLatestPatchVersion();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* ----- Background Image ----- */}
      <Image src="/background.jpg" alt="Background" layout="fill" />

      {/* ----------------------- Main Container ----------------------- */}
      <div className="container max-w-5xl mx-auto px-8 absolute inset-0 bg-[#121212] rounded-lg text-white overflow-y-auto scrollbar-thin scrollbar-thumb-[#DD1029] scrollbar-track-[#121212]">
        <div className="flex justify-center mt-8">
          {/* ----- Icon Logo -----*/}
          <Image
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
                    <li className=" border-b border-[#DD1029] px-4 py-2 hover:bg-[#292A2E] cursor-pointer">
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

                if (value.includes("#")) {
                  // Split the input into username and tag line
                  const [name, tag] = value.split("#");
                  setUsername(name || "");
                  setTagLine(tag || "");
                } else {
                  // If no tag line, set username and clear tag line
                  setUsername(value);
                  setTagLine("");
                }
              }}
              /* View history of searches */
              onClick={() => setIsHistoryVisible(!isHistoryVisible)}
            />
          </div>

          {/* ------- Button to search player -------*/}
          <button
            onClick={searchPlayer}
            className="bg-[#19191B] hover:bg-[#292A2E] px-4 py-2"
          >
            Search
          </button>
        </div>

        {isLoading ? (
          // ------ Loader while fetching data ----- //
          <div className="flex justify-center items-center h-96">
            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            <p className="ml-4 text-white">Chargement des données...</p>
          </div>
        ) : (
          // ------ Display player data ----- //
          playerData && (
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
                  <span className="font-bold">
                    {playerData.riotId.gameName}
                  </span>
                  <span className="text-gray-500">
                    #{playerData.riotId.tagLine}
                  </span>
                </div>
              </div>
              {/* Components  */}
              <div className="flex space-x-4">
                <Ranked rankedData={rankedData} />
                <Matchs
                  matchData={matchData}
                  playerData={playerData}
                  latestPatch={latestPatch}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
