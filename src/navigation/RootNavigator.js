import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import { MainAuthScreen } from "../features/Auth";
import { ParksLandingScreen } from "../features/ParksTab/screens/Landing/index";
import { NewsLandingScreen } from "../features/News/screens/Landing/index";
import { SettingsLandingScreen } from "../features/SettingsTab/screens/Landing/index";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator headerMode={"card"}>
      <Stack.Screen name={"Parks"} component={ParksLandingScreen} />
      <Stack.Screen name={"News"} component={NewsLandingScreen} />
      <Stack.Screen name={"Settings"} component={SettingsLandingScreen} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export const RootNavigator = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(newUser) {
    setUser(newUser);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack.Navigator headerMode={"none"}>
      {!user || initializing ? (
        <Stack.Screen name={"AUTH"} component={MainAuthScreen} />
      ) : (
        <Stack.Screen name={"MainNavigator"} component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
};
