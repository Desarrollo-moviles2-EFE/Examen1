import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPlaces } from "../components/config/config";

const PlaceList = ({ route }) => {
  const { city } = route.params;
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const loadPlaces = async () => {
      const data = await fetchPlaces(city);
      setPlaces(data);
      setLoading(false);
    };
    loadPlaces();
    loadFavorites();
  }, [city]);

  // Cargar favoritos desde AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error al cargar favoritos", error);
    }
  };

  // Alternar favoritos
  const toggleFavorite = async (place) => {
    const newFavorites = { ...favorites };

    if (newFavorites[place.id]) {
      delete newFavorites[place.id];
    } else {
      newFavorites[place.id] = place;
    }

    setFavorites(newFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

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
        onChangeText={(text) => setSearch(text)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={filteredPlaces}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.placeCard}>
              <TouchableOpacity
                onPress={() => navigation.navigate("PlaceDetails", { placeId: item.id })}
              >
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeCategory}>{item.category}</Text>
                <Text style={styles.placeCategory}>{item.address}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Text style={styles.favoriteButton}>{favorites[item.id] ? "⭐" : "☆"}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#f9f9f9"
  },
  placeCard: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  placeName: { fontSize: 18, fontWeight: "bold" },
  placeCategory: { fontSize: 14, color: "gray" },
  favoriteButton: { fontSize: 24 },
  favoritesButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  favoritesText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default PlaceList;
