let cemeteryData = [];

export const fetchCemeteryData = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cemeteries`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cemetery data");
    }

    const data = await response.json();
    cemeteryData = data;
    return data;
  } catch (error) {
    console.error("Error fetching cemetery data:", error);
    return [];
  }
};

export const getCemeteryDataByName = (name) => {
  return cemeteryData.find((cemetery) => cemetery.CEMETERY_NAME === name);
};

export const cemeteryNames = () => {
  return cemeteryData.map((cemetery) => cemetery.CEMETERY_NAME);
};

export default cemeteryData;
