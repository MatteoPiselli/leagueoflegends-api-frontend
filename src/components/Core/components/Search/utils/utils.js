// Utility functions for search form

/**
 * Parses user input to extract username and tagline
 */
export const parseUserInput = (input) => {
  if (!input || typeof input !== "string") {
    return { username: "", tagline: "" };
  }

  const [username = "", tagline = ""] = input.split("#");
  return {
    username: username.trim(),
    tagline: tagline.trim(),
  };
};

/**
 * Formats user input for display
 */
export const formatUserInput = (username, tagline) => {
  if (!username || !tagline) return "";
  return `${username}#${tagline}`;
};

/**
 * Validates search input
 */
export const validateSearchInput = (username, tagline) => {
  if (!username || !tagline) {
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
  tagline: "",
});
