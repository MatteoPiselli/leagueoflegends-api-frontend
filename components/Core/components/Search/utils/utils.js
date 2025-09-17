// Utility functions for search form

/**
 * Parses user input to extract username and tagline
 */
export const parseUserInput = (input) => {
  if (!input || typeof input !== "string") {
    return { username: "", tagLine: "" };
  }

  const [username = "", tagLine = ""] = input.split("#");
  return {
    username: username.trim(),
    tagLine: tagLine.trim(),
  };
};

/**
 * Formats user input for display
 */
export const formatUserInput = (username, tagLine) => {
  if (!username || !tagLine) return "";
  return `${username}#${tagLine}`;
};

/**
 * Validates search input
 */
export const validateSearchInput = (username, tagLine) => {
  if (!username || !tagLine) {
    return {
      isValid: false,
      message: "Please enter a valid username and tag line.",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};

/**
 * Creates initial form state
 */
export const createInitialFormState = () => ({
  inputValue: "",
  username: "",
  tagLine: "",
});
