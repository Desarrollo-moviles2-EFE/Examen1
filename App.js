import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store/store"; // Importa el store de Redux
import StackNavigator from "./src/components/navigation/StackNavigator";
import StackNavigatorFavoritos from "./src/components/navigation/StackNavigatorFavoritos";
import About from "./src/views/about";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
              let iconName;

              if (route.name === "Ciudades") {
                iconName = focused ? "location" : "location-outline"; // 📍 Efecto activo/inactivo
              } else if (route.name === "favoritos") {
                iconName = focused ? "star" : "star-outline"; // ⭐ Efecto activo/inactivo
              } else if (route.name === "Acerca de") {
                iconName = focused ? "information-circle" : "information-circle-outline"; // ℹ️ Efecto activo/inactivo
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Ciudades" component={StackNavigator} />
          <Tab.Screen name="favoritos" component={StackNavigatorFavoritos} />
          <Tab.Screen name="Acerca de" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
