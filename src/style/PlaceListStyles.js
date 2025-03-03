import { StyleSheet } from "react-native";

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
  placeName: { fontSize: 12, fontWeight: "bold" },
  placeCategory: { fontSize: 10, color: "gray" },
  favoriteButton: { fontSize: 18 },
  favoritesButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  favoritesText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default styles;
