import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";  // Importar el hook de navegación
import { fetchPlaces } from "../components/config/config"; // Importar la API desde config.js

const PlaceList = ({ route }) => {
  const { city } = route.params;
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Estado para la búsqueda
  const navigation = useNavigation();  // Usar la navegación dentro del componente

  useEffect(() => {
    const loadPlaces = async () => {
      const data = await fetchPlaces(city);
      setPlaces(data);
      setLoading(false);
    };
    loadPlaces();
  }, [city]);

  // Filtrar lugares según el texto ingresado en la búsqueda
  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lugares en {city}</Text>
      
      {/* Input de búsqueda */}
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
          data={filteredPlaces} // Usar la lista filtrada
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.placeCard}
              onPress={() => navigation.navigate("PlaceDetails", { placeId: item.id })} // Navegar a detalles
            >
              <Text style={styles.placeName}>{item.name}</Text>
              <Text style={styles.placeCategory}>{item.category}</Text>
              <Text style={styles.placeCategory}>{item.address}</Text>
            </TouchableOpacity>
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
  placeCard: { padding: 15, backgroundColor: "#f0f0f0", borderRadius: 8, marginVertical: 5 },
  placeName: { fontSize: 18, fontWeight: "bold" },
  placeCategory: { fontSize: 14, color: "gray" },
});

export default PlaceList;
