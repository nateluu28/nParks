import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ParksLandingScreen } from "../features/ParksTab/screens/Landing/index";

const Stack = createStackNavigator();

export const ParksTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Parks.Landing"}
        component={ParksLandingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
