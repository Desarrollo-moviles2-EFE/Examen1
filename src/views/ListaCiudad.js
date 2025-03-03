import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const cities = ["Amsterdam", "Barcelona", "Berlin", "Dubai", "London", "Paris", "Rome", "Tuscany"];

const CityList = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una ciudad</Text>
      <FlatList
        data={cities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cityButton}
            onPress={() => navigation.navigate("Places", { city: item })}
          >
            <Text style={styles.cityText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 2, padding: 10, backgroundColor: "#fff"},
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  cityButton: { padding: 15, backgroundColor: "#007AFF", borderRadius: 8, marginVertical: 5 },
  cityText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
});

export default CityList;
