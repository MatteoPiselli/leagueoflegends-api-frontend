import { useState, useCallback } from "react";
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

  // Handle input change
  const handleInputChange = useCallback((e) => {
    const inputValue = e.target.value;
    const { username, tagLine } = parseUserInput(inputValue);

    setFormData({
      inputValue,
      username,
      tagLine,
    });
  }, []);

  // Handle search action
  const handleSearch = useCallback(() => {
    const { username, tagLine } = formData;
    const validation = validateSearchInput(username, tagLine);

    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    // Add to history and perform search
    addToHistory(username, tagLine);
    setIsHistoryVisible(false);
    onSearch(username, tagLine);

    // Reset form
    setFormData(createInitialFormState());
  }, [formData, addToHistory, setIsHistoryVisible, onSearch]);

  // Handle history item click
  const handleHistoryItemClick = useCallback(
    (player) => {
      const inputText = formatUserInput(player.username, player.tagLine);
      setFormData({
        inputValue: inputText,
        username: player.username,
        tagLine: player.tagLine,
      });
      setIsHistoryVisible(false);
      onSearch(player.username, player.tagLine);
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
    isFormValid: formData.username && formData.tagLine,
  };
};
