import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPlaces } from "../components/config/config";

// Thunk para obtener lugares desde la API
export const fetchPlacesByCity = createAsyncThunk(
  "places/fetchPlacesByCity",
  async (city) => {
    const data = await fetchPlaces(city);
    return data;
  }
);

// Slice de Redux
const placesSlice = createSlice({
  name: "places",
  initialState: {
    places: [],
    loading: false,
    favorites: {},
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const place = action.payload;
      if (state.favorites[place.id]) {
        delete state.favorites[place.id];
      } else {
        state.favorites[place.id] = place;
      }
      AsyncStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    loadFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlacesByCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlacesByCity.fulfilled, (state, action) => {
        state.places = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlacesByCity.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleFavorite, loadFavorites } = placesSlice.actions;
export default placesSlice.reducer;
