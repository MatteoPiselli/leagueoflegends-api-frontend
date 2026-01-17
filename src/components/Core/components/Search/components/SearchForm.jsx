import { useCallback } from "react";
import { useSearchHistory } from "../../../../../hooks";
import { RegionDropdown } from "./RegionDropdown";
import { SearchHistory } from "./SearchHistory";
import { useSearchForm } from "../hooks/useSearchForm";

export const SearchForm = ({ onSearch, isLoading }) => {
  const {
    history,
    isHistoryVisible,
    addToHistory,
    removeFromHistory,
    setIsHistoryVisible,
  } = useSearchHistory();

  const {
    formData,
    handleInputChange,
    handleSearch,
    handleHistoryItemClick,
    isFormValid,
  } = useSearchForm({ onSearch, addToHistory, setIsHistoryVisible });

  // Handle region selection
  const handleRegionSelect = useCallback((region) => {
    // TODO: Implement region selection logic
  }, []);

  // Handle history toggle
  const handleToggleHistory = useCallback(() => {
    setIsHistoryVisible((prev) => !prev);
  }, [setIsHistoryVisible]);

  return (
    <div className="relative mt-8">
      <div className="flex items-center justify-center space-x-4">
        {/* Region Dropdown */}
        <RegionDropdown onRegionSelect={handleRegionSelect} />

        {/* Input for username and tag line */}
        <div className="relative flex flex-col items-center">
          <input
            type="text"
            placeholder="Username#tagline (Ex: MaTTeo#ZOFGK)"
            className="bg-[#19191B] w-96 text-white p-2"
            value={formData.inputValue}
            onChange={handleInputChange}
            onClick={handleToggleHistory}
            disabled={isLoading}
          />

          {/* Search History */}
          <SearchHistory
            isVisible={isHistoryVisible}
            history={history}
            onHistoryItemClick={handleHistoryItemClick}
            onRemoveFromHistory={removeFromHistory}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isLoading || !isFormValid}
          className="px-8 py-2 bg-[#DD1029] text-white rounded-lg hover:bg-[#b30d23] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};
