import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator, Image, ScrollView } from "react-native";
import { fetchPlaceDetails } from "../components/config/config";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {place.icon && <Image source={{ uri: place.icon }} style={styles.icon} />}
        <Text style={styles.name}>{place.name}</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Categoría</Text>
      <Text style={styles.text}>{place.category || "No especificada"}</Text>
      
      <Text style={styles.sectionTitle}>Dirección</Text>
      <Text style={styles.text}>{place.address || "No disponible"}</Text>
      
      <Text style={styles.sectionTitle}>Ubicación</Text>
      <Text style={styles.text}>{place.location} ({place.lat}, {place.lng})</Text>
      
      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.text}>{place.description?.es || "No disponible"}</Text>

      <Text style={styles.sectionTitle}>Teléfonos</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${place.phone_number}`)}>
        <Text style={[styles.text, styles.link]}>{place.phone_number || "No disponible"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${place.international_phone_number}`)}>
        <Text style={[styles.text, styles.link]}>{place.international_phone_number || "No disponible"}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Sitio Web</Text>
      <TouchableOpacity onPress={() => Linking.openURL(place.website)}>
        <Text style={[styles.text, styles.link]}>{place.website || "No disponible"}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Enlaces Externos</Text>
      {place.external_urls?.GooglePlaces && (
        <TouchableOpacity onPress={() => Linking.openURL(place.external_urls.GooglePlaces)}>
          <Text style={[styles.text, styles.link]}>Google Places</Text>
        </TouchableOpacity>
      )}
      {place.external_urls?.Booking?.es && (
        <TouchableOpacity onPress={() => Linking.openURL(place.external_urls.Booking.es)}>
          <Text style={[styles.text, styles.link]}>Booking</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionTitle}>Número de Reseñas</Text>
      <Text style={styles.text}>{place.numReviews || 0}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f5f5f5" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  icon: { width: 40, height: 40, marginRight: 10 },
  name: { fontSize: 22, fontWeight: "bold", color: "#333" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 16, color: "#444", marginBottom: 5 },
  link: { color: "#007bff", textDecorationLine: "underline" },
});

export default PlaceDetails;
