import axios from "axios";

const API_BASE_URL = "http://tour-pedia.org/api";

// Obtener lista de lugares
export const fetchPlaces = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getPlaces?location=${city}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

// Obtener detalles de un lugar por ID
export const fetchPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getPlaceDetails?id=${placeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};
