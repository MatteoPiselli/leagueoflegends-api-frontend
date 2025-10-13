import { useState } from "react";

export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // Add player to search history
  const addToHistory = (username, tagline) => {
    setHistory((prev) => {
      const newEntry = {
        username,
        tagline,
      };
      // Check if the entry already exists in history
      const filtered = prev.filter(
        (item) => item.username !== username || item.tagline !== tagline
      );
      return [...filtered, newEntry];
    });
  };

  // Remove player from search history
  const removeFromHistory = (username, tagline) => {
    setHistory((prev) =>
      prev.filter(
        (item) => item.username !== username || item.tagline !== tagline
      )
    );
  };

  // Toggle history visibility
  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => !prev);
  };

  // Get last 5 searches in reverse order
  const getRecentHistory = () => {
    return history.slice(-5).reverse();
  };

  return {
    history,
    isHistoryVisible,
    addToHistory,
    removeFromHistory,
    toggleHistoryVisibility,
    getRecentHistory,
    setIsHistoryVisible,
  };
};
