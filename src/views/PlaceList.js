import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlacesByCity, toggleFavorite, loadFavorites } from "../slices/placesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/PlaceListStyles";

const PlaceList = ({ route }) => {
  const { city } = route.params;
  const dispatch = useDispatch();
  const { places, loading, favorites } = useSelector((state) => state.places);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchPlacesByCity(city));
    loadFavoritesFromStorage();
  }, [city]);

  const loadFavoritesFromStorage = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        dispatch(loadFavorites(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Error al cargar favoritos", error);
    }
  }, [dispatch]);

  // Filtrar lugares según búsqueda
  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lugares en {city}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar un lugar..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={filteredPlaces}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10} // 🔹 Renderiza solo 10 elementos inicialmente
          maxToRenderPerBatch={10} // 🔹 Carga 10 más por lote para mejorar rendimiento
          windowSize={5} // 🔹 Mantiene solo 5 elementos en memoria
          renderItem={({ item }) => (
            <View style={styles.placeCard}>
              <TouchableOpacity onPress={() => navigation.navigate("PlaceDetails", { placeId: item.id })}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeCategory}>{item.category}</Text>
                <Text style={styles.placeCategory}>{item.address}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(toggleFavorite(item))}>
                <Text style={styles.favoriteButton}>{favorites[item.id] ? "⭐" : "☆"}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default PlaceList;
