import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default styles;
