import { useCallback } from "react";

export const useSearchHistoryDisplay = ({
  history,
  onHistoryItemClick,
  onRemoveFromHistory,
}) => {
  // Handle click on history item
  const handleItemClick = useCallback(
    (player) => {
      onHistoryItemClick?.(player);
    },
    [onHistoryItemClick]
  );

  // Handle item removal
  const handleRemoveClick = useCallback(
    (e, player) => {
      e.stopPropagation();
      onRemoveFromHistory?.(player.username, player.tagline);
    },
    [onRemoveFromHistory]
  );

  // Format history for display (last 5 items, reversed)
  const getDisplayHistory = useCallback(() => {
    return history.slice(-5).reverse();
  }, [history]);

  // Check if history is empty
  const isEmpty = history.length === 0;

  return {
    handleItemClick,
    handleRemoveClick,
    getDisplayHistory,
    isEmpty,
  };
};
