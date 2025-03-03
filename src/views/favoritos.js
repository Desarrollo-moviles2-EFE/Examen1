import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styles from "../style/favoritosStyles";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

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

export default Favorites;
