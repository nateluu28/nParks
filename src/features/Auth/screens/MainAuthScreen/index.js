import React, { useState } from "react";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { SafeAreaView } from "react-native-safe-area-context";

import auth from "@react-native-firebase/auth";

import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { View, ImageBackground, TextInput } from "react-native";
import { useDarkMode } from "react-native-dark-mode";

import { Button, Header } from "../../../../components";
import { KeyboardAvoidingView } from "react-native";
import { Keyboard } from "react-native";
import { Platform } from "react-native";

const AuthButton = styled(Flex)`
  background: #5ca4ff;
  box-shadow: 0px 0px 5px black;
  shadow-opacity: 0.5;
  border-radius: 7px;
  font-family: SFProDisplay-Bold;
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 0.11px;
  text-align: center;
  height: 55px;
  margin-bottom: 10px;
`;
const AuthButtonText = styled.Text`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  color: white;
`;

const AuthHeaderText = styled.Text`
  font-weight: 700;
  font-size: 60px;
  color: white;
`;

export const MainAuthScreen = () => {
  const isDarkMode = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../../../../assets/images/toyota.jpg")}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <SafeAreaView
          style={{
            backgroundColor: "#00000075",
            width: "100%",
            height: "100%",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Box justifyContent={"flex-end "}>
              <Box textAlign={"left"} ml={10} my={5}>
                <AuthHeaderText>{"Discover"}</AuthHeaderText>
                <AuthHeaderText>{"Your"}</AuthHeaderText>
                <AuthHeaderText>{"Park."}</AuthHeaderText>
              </Box>
              <Box>
                <Flex flexDirection={"column"} justifyContent={"flex-end"}>
                  <Box mt={10}>
                    <Box mb={1} mx={12}>
                      <Header
                        fontSize={16}
                        color={isDarkMode ? "white" : "black"}
                      >
                        {"Email"}
                      </Header>
                    </Box>
                    <Box mx={12}>
                      <TextInput
                        placeholder="hello@email.com"
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
                  </Box>
                  <Box mt={10}>
                    <Box mb={1} mx={12}>
                      <Header
                        fontSize={16}
                        color={isDarkMode ? "white" : "black"}
                      >
                        {"Email"}
                      </Header>
                    </Box>
                    <Box mx={12}>
                      <TextInput
                        placeholder="*********"
                        onChangeText={(text) => {
                          setPassword(text);
                        }}
                        placeholderTextColor={"black"}
                        secureTextEntry
                        style={{
                          color: "black",
                          backgroundColor: "lightgrey",
                          padding: 8,
                          borderRadius: 3,
                        }}
                      />
                    </Box>
                  </Box>
                </Flex>
                <Button
                  mt={3}
                  mx={12}
                  buttonText={"Sign Up"}
                  onPress={async () => {
                    Keyboard.dismiss();
                    await auth().createUserWithEmailAndPassword(
                      email,
                      password
                    );
                  }}
                />
                <Button
                  mt={1}
                  mx={12}
                  buttonText={"Login"}
                  onPress={async () => {
                    Keyboard.dismiss();
                    await auth().signInWithEmailAndPassword(email, password);
                  }}
                />
              </Box>
            </Box>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
