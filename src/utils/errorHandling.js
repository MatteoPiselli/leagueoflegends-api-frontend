// Function to handle HTTP errors
export const handleHttpError = (status, statusText) => {
  switch (status) {
    case 400:
      statusText = "Bad Request: Please check your input.";
      break;
    case 401:
      statusText = "Unknown API key: Please check your API key.";
      break;
    case 403:
      statusText =
        "Forbidden: You do not have permission to access this resource. Please check your API key";
      break;
    case 404:
      statusText = "Player not found. Please check the username and tagline.";
      break;
    case 415:
      statusText =
        "Unsupported Media Type. The request body is in a format that is not supported.";
      break;
    case 429:
      statusText =
        "Too Many Requests. You have exceeded the rate limit for this API. Please try again in 1 minute.";
      break;
    case 500:
      statusText = "Internal Server Error. Please try again later.";
      break;
    case 503:
      statusText = "Service Unavailable. Please try again later.";
      break;
    default:
      statusText = `Error (Code ${status}). Please try again later.`;
  }

  console.error(`HTTP Error ${status}: ${statusText}`);
  alert(`Error: ${status}${"\n\n"} ${statusText}`);
  return false;
};
