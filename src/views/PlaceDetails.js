import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator, Image, ScrollView } from "react-native";
import { fetchPlaceDetails } from "../components/config/config";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import styles from "../style/PlaceDetailStyle";

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

      {/* Categoría */}
      <View style={styles.section}>
        <FontAwesome name="tag" size={20} color="#007bff" style={styles.iconStyle} />
        <View>
          <Text style={styles.sectionTitle}>Categoría</Text>
          <Text style={styles.text}>{place.category || "No especificada"}</Text>
        </View>
      </View>

      {/* Dirección */}
      <View style={styles.section}>
        <MaterialIcons name="place" size={22} color="#007bff" style={styles.iconStyle} />
        <View>
          <Text style={styles.sectionTitle}>Dirección</Text>
          <Text style={styles.text}>{place.address || "No disponible"}</Text>
        </View>
      </View>

      {/* Ubicación */}
      <View style={styles.section}>
        <FontAwesome name="map-marker" size={22} color="#007bff" style={styles.iconStyle} />
        <View>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <Text style={styles.text}>{place.location} ({place.lat}, {place.lng})</Text>
        </View>
      </View>

      {/* Descripción */}
      <View style={styles.section}>
        <MaterialIcons name="description" size={22} color="#007bff" style={styles.iconStyle} />
        <View>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.text}>{place.description?.es || "No disponible"}</Text>
        </View>
      </View>

      {/* Teléfonos */}
      <View style={styles.section}>
        <FontAwesome name="phone" size={20} color="#007bff" style={styles.iconStyle} />
        <View>
          <Text style={styles.sectionTitle}>Teléfonos</Text>
          {place.phone_number ? (
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${place.phone_number}`)}>
              <Text style={[styles.text, styles.link]}>{place.phone_number}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.text}>No disponible</Text>
          )}
          {place.international_phone_number ? (
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${place.international_phone_number}`)}>
              <Text style={[styles.text, styles.link]}>{place.international_phone_number}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Sitio Web */}
      <View style={styles.section}>
        <FontAwesome name="globe" size={20} color="#007bff" style={styles.iconStyle} />
        <View>
          <Text style={styles.sectionTitle}>Sitio Web</Text>
          {place.website ? (
            <TouchableOpacity onPress={() => Linking.openURL(place.website)}>
              <Text style={[styles.text, styles.link]}>{place.website}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.text}>No disponible</Text>
          )}
        </View>
      </View>

      {/* Enlaces Externos */}
      <View style={styles.section}>
        <FontAwesome name="external-link" size={20} color="#007bff" style={styles.iconStyle} />
        <View>
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
        </View>
      </View>

      {/* Número de Reseñas */}
      <View style={styles.section}>
        <FontAwesome name="star" size={20} color="#007bff" style={styles.iconStyle} />
        <View>
          <Text style={styles.sectionTitle}>Número de Reseñas</Text>
          <Text style={styles.text}>{place.numReviews || 0}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;
