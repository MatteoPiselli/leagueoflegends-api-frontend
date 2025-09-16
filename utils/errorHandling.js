// Function to handle HTTP errors
export const handleHttpError = (status, statusText) => {
  let message;

  switch (status) {
    case 400:
      message = "Bad Request: Please check your input.";
      break;
    case 401:
      message = "Unknown API key: Please check your API key.";
      break;
    case 404:
      message = "Player not found. Please check the username and tag.";
      break;
    case 403:
      message =
        "Forbidden: You do not have permission to access this resource. Please check your API key";
      break;
    case 429:
      message =
        "Too Many Requests. You have exceeded the rate limit for this API. Please try again in 1 minute.";
      break;
    case 500:
      message = "Internal Server Error. Please try again later.";
      break;
    default:
      message = `Unknown error (Code ${status}). Please try again later.`;
  }

  console.error(`HTTP Error ${status}: ${message}`);
  alert(`Error: ${status}${"\n\n"} ${message}`);
  return false;
};
