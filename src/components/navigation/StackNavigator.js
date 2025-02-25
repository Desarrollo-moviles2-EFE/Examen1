import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CityList from "../../views/ListaCiudad";  // Pantalla de ciudades
import PlaceList from "../../views/PlaceList";  // Lista de lugares en una ciudad
import PlaceDetails from "../../views/PlaceDetails";  // Detalles de un lugar

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Cities">
      <Stack.Screen name="Cities" component={CityList} options={{ title: "Ciudades" }} />
      <Stack.Screen name="Places" component={PlaceList} options={{ title: "Lugares" }} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{ title: "Detalles" }} />
    </Stack.Navigator>
  );
}
