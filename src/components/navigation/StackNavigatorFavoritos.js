import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import favoritos from "../../views/favoritos";
import PlaceDetails from "../../views/PlaceDetails";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="favoritos">
      <Stack.Screen name="favoritos" component={favoritos} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
