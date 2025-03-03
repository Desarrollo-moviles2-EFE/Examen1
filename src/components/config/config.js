import axios from "axios";

const API_BASE_URL = "http://tour-pedia.org/api";

// Configurar Axios con caché
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 🔹 Tiempo límite para evitar esperas innecesarias
  headers: {
    "Cache-Control": "no-cache", // 🔹 Evita respuestas obsoletas en caché
  },
});

// Obtener lista de lugares con control de errores mejorado
export const fetchPlaces = async (city) => {
  try {
    const response = await api.get(`/getPlaces?location=${city}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener lugares:", error.message);
    return [];
  }
};

// Obtener detalles de un lugar con reintento en caso de error
export const fetchPlaceDetails = async (placeId) => {
  try {
    const response = await api.get(`/getPlaceDetails?id=${placeId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles del lugar:", error.message);
    return null;
  }
};
