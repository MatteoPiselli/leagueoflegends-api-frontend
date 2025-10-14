import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addSummoner } from "../../../../../reducers/summoner";
import {
  parseUserInput,
  validateSearchInput,
  createInitialFormState,
  formatUserInput,
} from "../utils/utils";

export const useSearchForm = ({
  onSearch,
  addToHistory,
  setIsHistoryVisible,
}) => {
  const [formData, setFormData] = useState(createInitialFormState());
  const dispatch = useDispatch();

  // Handle input change
  const handleInputChange = useCallback((e) => {
    const inputValue = e.target.value;
    const { username, tagline } = parseUserInput(inputValue);

    setFormData({
      inputValue,
      username,
      tagline,
    });
  }, []);

  // Handle search action
  const handleSearch = useCallback(() => {
    const { username, tagline } = formData;
    const validation = validateSearchInput(username, tagline);

    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    // Add to history and perform search
    addToHistory(username, tagline);
    setIsHistoryVisible(false);
    onSearch(username, tagline);

    // 🔍 Log avant dispatch
    console.log("🚀 Dispatching addSummoner:", { username, tagline });
    const action = dispatch(addSummoner({ username, tagline }));
    console.log("📤 Action dispatched:", action);

    // Reset form
    setFormData(createInitialFormState());
  }, [formData, addToHistory, setIsHistoryVisible, onSearch]);

  // Handle history item click
  const handleHistoryItemClick = useCallback(
    (player) => {
      const inputText = formatUserInput(player.username, player.tagline);
      setFormData({
        inputValue: inputText,
        username: player.username,
        tagline: player.tagline,
      });
      setIsHistoryVisible(false);
      onSearch(player.username, player.tagline);
    },
    [setIsHistoryVisible, onSearch]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(createInitialFormState());
  }, []);

  // Update form with specific values
  const updateFormData = useCallback((updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  return {
    formData,
    handleInputChange,
    handleSearch,
    handleHistoryItemClick,
    resetForm,
    updateFormData,
    isFormValid: formData.username && formData.tagline,
  };
};
