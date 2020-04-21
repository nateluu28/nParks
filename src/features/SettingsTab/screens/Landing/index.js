import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { Header, Button } from "../../../../components";

import auth from "@react-native-firebase/auth";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Image, Text } from "react-native";
import { useDarkMode } from "react-native-dark-mode";

export const SettingsLandingScreen = () => {
  // Set an initializing state whilst Firebase connects
  const isDarkMode = useDarkMode();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView>
      <ScrollView>
        <Flex>
          <Flex m={3} flexDirection={"row"} justifyContent={"space-between"}>
            <Header fontSize={22} color={isDarkMode ? "white" : "black"}>
              {"Settings"}
            </Header>
          </Flex>
          <Box mt={10}>
            <Box mb={1} mx={12}>
              <Header fontSize={16} color={isDarkMode ? "white" : "black"}>
                {`Email`}
              </Header>
            </Box>
            <Box mx={12}>
              <TextInput
                placeholder={`${auth().currentUser.email}` || "hello@email.com"}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                placeholderTextColor={"black"}
                style={{
                  color: "black",
                  backgroundColor: "lightgrey",
                  padding: 8,
                  borderRadius: 3,
                }}
              />
            </Box>
            <Box>
              <Button
                my={3}
                mx={12}
                setting
                disabled={email === false}
                buttonText={"Change Email"}
                onPress={async () => {
                  await auth().currentUser.updateEmail(email);
                }}
              />
            </Box>
          </Box>
          <Box mt={10}>
            <Box mb={1} mx={12}>
              <Header fontSize={16} color={isDarkMode ? "white" : "black"}>
                {"Password"}
              </Header>
            </Box>
            <Box mx={12}>
              <TextInput
                placeholder="*********"
                placeholderTextColor={isDarkMode ? "darkgrey" : "grey"}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                style={{
                  color: "black",
                  backgroundColor: "lightgrey",
                  padding: 8,
                  borderRadius: 3,
                }}
              />
            </Box>
            <Box>
              <Button
                my={3}
                mx={12}
                setting
                disabled={password === false}
                buttonText={"Change Password"}
                onPress={async () => {
                  await auth().currentUser.updatePassword(password);
                }}
              />
            </Box>
          </Box>

          <Button
            my={2}
            mx={2}
            setting
            buttonText={"Log out"}
            onPress={async () => {
              await auth().signOut();
            }}
          />
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
};
