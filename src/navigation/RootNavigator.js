import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import { MainAuthScreen } from "../features/Auth";
import { ParksLandingScreen } from "../features/ParksTab/screens/Landing/index";
import { NewsLandingScreen } from "../features/News/screens/Landing/index";
import { SettingsLandingScreen } from "../features/SettingsTab/screens/Landing/index";
import { ParksTabNavigator } from "./ParksTabNavigator";
import { ParkDetailsScreen } from "../features/ParksTab/screens/ParkDetails/index";
import { AlertDetails } from "../features/ParksTab/screens/AlertDetails/index";
import { OperatingHoursScreen } from "../features/ParksTab/screens/OperatingHours/index";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTrees,
  faNewspaper,
  faCog,
  faHeart,
} from "@fortawesome/pro-light-svg-icons";
import { FavoritesLandingScreen } from "../features/FavoritesTab/screens/Landing/index";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator headerMode={"card"}>
      <Tab.Screen
        name={"Parks"}
        component={ParksTabNavigator}
        options={{
          tabBarLabel: "Parks",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faTrees} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"News"}
        component={NewsLandingScreen}
        options={{
          tabBarLabel: "News",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faNewspaper} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"Favorites"}
        component={FavoritesLandingScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHeart} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"Settings"}
        component={SettingsLandingScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faCog} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigatorStack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <MainNavigatorStack.Navigator headerMode={"none"}>
      <MainNavigatorStack.Screen name={"Tabs"} component={TabNavigator} />
      <MainNavigatorStack.Screen
        name={"Parks.Details"}
        component={ParkDetailsScreen}
      />
      <MainNavigatorStack.Screen
        name={"Parks.Details.Alerts"}
        component={AlertDetails}
      />
      <MainNavigatorStack.Screen
        name={"Parks.Details.Hours"}
        component={OperatingHoursScreen}
      />
    </MainNavigatorStack.Navigator>
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
        <Stack.Screen name={"MainNavigator"} component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};
