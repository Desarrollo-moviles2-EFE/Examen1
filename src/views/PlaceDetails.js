import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from "react-native";
import { fetchPlaceDetails } from "../components/config/config"; // Importamos la función de la API

const PlaceDetails = ({ route }) => {
  const { placeId } = route.params;
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaceDetails = async () => {
      const data = await fetchPlaceDetails(placeId);
      setPlace(data);
      setLoading(false);
    };
    getPlaceDetails();
  }, [placeId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontraron detalles para este lugar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{place.name}</Text>

      <Text style={styles.sectionTitle}>Direccion</Text>
      <Text style={styles.address}>{place.address || "Dirección no disponible"}</Text>
      
      <Text style={styles.sectionTitle}>Ubicacion</Text>
      <Text style={styles.address}>{place.location || "Dirección no disponible"}</Text>

      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.text}>{place.description?.es || "No disponible"}</Text>

      <Text style={styles.sectionTitle}>Teléfono</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${place.phone_number}`)}>
        <Text style={[styles.text, styles.link]}>{place.phone_number || "No disponible"}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Teléfono Internacional</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${place.international_phone_number}`)}>
        <Text style={[styles.text, styles.link]}>{place.international_phone_number || "No disponible"}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Sitio Web</Text>
      <TouchableOpacity onPress={() => Linking.openURL(place.website)}>
        <Text style={[styles.text, styles.link]}>{place.website || "No disponible"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f5f5f5" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 20 },
  name: { fontSize: 22, fontWeight: "bold", color: "#333" },
  address: { fontSize: 16, color: "#666", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 16, color: "#444", marginBottom: 5 },
  link: { color: "#007bff", textDecorationLine: "underline" },
});

export default PlaceDetails;
