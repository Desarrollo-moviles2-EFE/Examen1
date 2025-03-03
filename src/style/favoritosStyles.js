import { StyleSheet } from "react-native";

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
    placeName: { fontSize: 12, fontWeight: "bold" },
    placeCategory: { fontSize: 10, color: "gray" },
    removeButton: { fontSize: 18, color: "red" },
  });

  
export default styles;