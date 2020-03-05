import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ParksLandingScreen } from "../features/ParksTab/screens/Landing/index";
import { ParkDetailsScreen } from "../features/ParksTab/screens/ParkDetails/index";

const Stack = createStackNavigator();

export const ParksTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Parks.Landing"} component={ParksLandingScreen} />
      <Stack.Screen name={"Parks.Details"} component={ParkDetailsScreen} />
    </Stack.Navigator>
  );
};
