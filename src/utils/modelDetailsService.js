/**
 * Fetches model details from the server
 * @returns {Promise<Array>} Array of model details objects
 */
export const fetchModelDetails = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/model-details`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch model details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching model details:", error);
    return [];
  }
};
