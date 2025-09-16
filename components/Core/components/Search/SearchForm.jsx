import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { History, X } from "lucide-react";

export const SearchForm = ({
  onSearch,
  isLoading,
  history,
  isHistoryVisible,
  onRemoveFromHistory,
  onSetHistoryVisible,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [region, setRegion] = useState(false);

  const toggleDropdown = () => setRegion(!region);

  const handleSearch = () => {
    if (!username || !tagLine) {
      alert("Please enter a valid username and tag line.");
      return;
    }
    onSetHistoryVisible(false);
    onSearch(username, tagLine);
    // Reset input after search
    setInputValue("");
    setUsername("");
    setTagLine("");
  };

  return (
    <div className="relative mt-8">
      <div className="flex items-center justify-center space-x-4">
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
            onClick={() => onSetHistoryVisible((prev) => !prev)}
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
                            key={index}
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
                                onSetHistoryVisible(false);
                                onSearch(player.username, player.tagLine);
                              }}
                            >
                              {player.username}#{player.tagLine}
                            </div>
                            <X
                              className="w-4 h-4 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFromHistory(index);
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

      {/* Region Dropdown */}
      <AnimatePresence>
        {region && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-[#2a2a2a] border border-[#DD1029] rounded-lg shadow-lg z-50"
          >
            <div className="p-2 min-w-[200px]">
              <div className="text-gray-300 text-sm font-medium mb-2 px-2">
                Select Region
              </div>
              {[
                { code: "EUW", name: "Europe West" },
                { code: "NA", name: "North America" },
                { code: "KR", name: "Korea" },
                { code: "JP", name: "Japan" },
              ].map((regionItem) => (
                <div
                  key={regionItem.code}
                  className="p-2 hover:bg-[#3a3a3a] rounded-md cursor-pointer text-white"
                  onClick={() => {
                    setRegion(false);
                    // Handle region selection if needed
                  }}
                >
                  {regionItem.name} ({regionItem.code})
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
