import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { History, X } from "lucide-react";
import { useSearchHistory } from "../../../../hooks/useSearchHistory";

export const SearchForm = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [region, setRegion] = useState(false);

  const {
    history,
    isHistoryVisible,
    addToHistory,
    removeFromHistory,
    setIsHistoryVisible,
  } = useSearchHistory();

  const regions = [
    {
      code: "EUW",
      name: "Europe West",
      image:
        "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-store/global/default/storefront/addon/public/img/content/transfer/euw.jpg",
    },
    {
      code: "NA",
      name: "North America",
      image:
        "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-store/global/default/storefront/addon/public/img/content/transfer/na.jpg",
    },
    {
      code: "KR",
      name: "Korea",
      flag: "🇰🇷",
    },
  ];

  const toggleDropdown = () => setRegion(!region);

  const handleSearch = () => {
    if (!username || !tagLine) {
      alert("Please enter a valid username and tag line.");
      return;
    }
    addToHistory(username, tagLine);

    setIsHistoryVisible(false);
    onSearch(username, tagLine);

    // Reset input after search
    setInputValue("");
    setUsername("");
    setTagLine("");
  };

  const handleRemoveFromHistory = (username, tagLine) => {
    removeFromHistory(username, tagLine);
  };

  return (
    <div className="relative mt-8">
      <div className="flex items-center justify-center space-x-4">
        {/* Region Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 bg-[#DD1129] text-white rounded-lg hover:bg-[#b30d23] transition-colors"
          >
            <Image
              src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-store/global/default/storefront/addon/public/img/content/transfer/euw.jpg"
              alt="EUW"
              width={20}
              height={20}
              className="inline-block mr-1"
            />
            EUW
          </button>

          <AnimatePresence>
            {region && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 -ml-16 mt-2 bg-[#2a2a2a] border border-[#DD1029] rounded-lg shadow-lg z-50"
              >
                {/* Flèche pointant vers le haut */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#DD1029]"></div>
                  <div className="absolute top-[1px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-[#2a2a2a]"></div>
                </div>

                <div className="p-2 min-w-[200px]">
                  <div className="text-gray-300 text-sm font-medium mb-2 px-2">
                    Select Region
                  </div>
                  {regions.map((regionItem) => (
                    <div
                      key={regionItem.code}
                      className="p-1 hover:bg-[#3a3a3a] cursor-pointer text-white"
                      onClick={() => {
                        setRegion(false);
                      }}
                    >
                      {regionItem.image ? (
                        <div className="flex items-center space-x-1">
                          <Image
                            src={regionItem.image}
                            alt={regionItem.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                          <span>
                            {regionItem.name} ({regionItem.code})
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>{regionItem.flag}</span>
                          <span>
                            {regionItem.name} {regionItem.code}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
            disabled={isLoading}
          />

          {/* ------------- History of searches ------------- */}
          <AnimatePresence>
            {isHistoryVisible && (
              <motion.div
                className="absolute top-full left-0 w-96 bg-[#19191B] text-white rounded-b-lg shadow-lg mt-2 z-50"
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
                            key={`${player.username}-${player.tagLine} ${index}`}
                            className="relative flex items-center px-4 py-2 hover:bg-[#292A2E] cursor-pointer"
                          >
                            <History className="inline mr-2 w-4 h-4" />
                            <div
                              className="flex-1"
                              onClick={() => {
                                const inputText = `${player.username}#${player.tagLine}`;
                                setInputValue(inputText);
                                setUsername(player.username);
                                setTagLine(player.tagLine);
                                setIsHistoryVisible(false);
                                onSearch(player.username, player.tagLine);
                              }}
                            >
                              {player.username}#{player.tagLine}
                            </div>
                            <X
                              className="w-4 h-4 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromHistory(
                                  player.username,
                                  player.tagLine
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

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isLoading || !username || !tagLine}
          className="px-8 py-2 bg-[#DD1029] text-white rounded-lg hover:bg-[#b30d23] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};
