import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { History, X } from "lucide-react";
import { useSearchHistoryDisplay } from "../hooks/useSearchHistory";

export const SearchHistory = ({
  isVisible,
  history,
  onHistoryItemClick,
  onRemoveFromHistory,
}) => {
  const { handleItemClick, handleRemoveClick, getDisplayHistory, isEmpty } =
    useSearchHistoryDisplay({
      history,
      onHistoryItemClick,
      onRemoveFromHistory,
    });

  const displayHistory = getDisplayHistory();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute top-full left-0 w-96 bg-[#19191B] text-white rounded-b-lg shadow-lg mt-2 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: -7 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {!isEmpty ? (
            // Display if history is not empty
            <ul className="max-h-60 overflow-y-auto">
              {displayHistory.map((player, index) => (
                <li
                  key={`${player.username}-${player.tagLine}-${index}`}
                  className="relative flex items-center px-4 py-2 hover:bg-[#292A2E] cursor-pointer"
                  onClick={() => handleItemClick(player)}
                >
                  <History className="inline mr-2 w-4 h-4" />
                  <div className="flex-1">
                    {player.username}#{player.tagLine}
                  </div>
                  <X
                    className="w-4 h-4 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                    onClick={(e) => handleRemoveClick(e, player)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            // Display poro icon and message if history is empty
            <div className="flex flex-col items-center justify-center py-8">
              <Image
                src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-search-empty-poro.svg"
                alt="Poro icon"
                width={70}
                height={70}
              />
              <p className="text-gray-400 text-sm mt-3">No recent researches</p>
              <p className="text-gray-500 text-xs mt-1">
                Your searches will appear here
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
