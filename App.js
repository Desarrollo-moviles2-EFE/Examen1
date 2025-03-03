import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/components/navigation/StackNavigator";
import favoritos from "./src/views/favoritos";
import About from "./src/views/about";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Ciudades") {
              iconName = "location-outline";
            } else if (route.name === "Acerca de") {
              iconName = "information-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // Oculta la barra superior para los tabs
        })}
      >
        <Tab.Screen name="Ciudades" component={StackNavigator} />
        <Tab.Screen name="favoritos" component={favoritos} />
        <Tab.Screen name="Acerca de" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
