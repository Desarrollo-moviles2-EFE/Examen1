import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Favorites = () => {
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    loadFavorites();
  }, []);

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

  const removeFavorite = async (id) => {
    const newFavorites = { ...favorites };
    delete newFavorites[id];
    setFavorites(newFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Favoritos</Text>
      <FlatList
        data={Object.values(favorites)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.placeCard}>
            <TouchableOpacity onPress={() => navigation.navigate("PlaceDetails", { placeId: item.id })}>
              <Text style={styles.placeName}>{item.name}</Text>
              <Text style={styles.placeCategory}>{item.category}</Text>
              <Text style={styles.placeCategory}>{item.address}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
              <Text style={styles.removeButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
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
  removeButton: { fontSize: 24, color: "red" },
});

export default Favorites;
