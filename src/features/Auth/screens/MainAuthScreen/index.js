import React from "react";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { SafeAreaView } from "react-native-safe-area-context";

import auth from "@react-native-firebase/auth";

import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, ImageBackground } from "react-native";

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
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../../../../assets/images/toyota.jpg")}
    >
      <SafeAreaView style={{ backgroundColor: "#00000075" }}>
        <Flex
          flexDirection={"column"}
          justifyContent={"flex-end"}
          width={"100%"}
          height={"100%"}
        >
          <Box textAlign={"left"} ml={10} mb={5}>
            <AuthHeaderText>{"Discover"}</AuthHeaderText>
            <AuthHeaderText>{"Your"}</AuthHeaderText>
            <AuthHeaderText>{"Park."}</AuthHeaderText>
          </Box>
          <Box>
            <Flex flexDirection={"column"}>
              <Box>
                <TouchableOpacity>
                  <AuthButton
                    alginItems={"center"}
                    justifyContent={"center"}
                    mx={12}
                  >
                    <AuthButtonText>{"Sign Up"}</AuthButtonText>
                  </AuthButton>
                </TouchableOpacity>
              </Box>
              <Box>
                <TouchableOpacity>
                  <AuthButton
                    alginItems={"center"}
                    justifyContent={"center"}
                    mx={12}
                  >
                    <AuthButtonText>{"Login"}</AuthButtonText>
                  </AuthButton>
                </TouchableOpacity>
              </Box>
            </Flex>
          </Box>
          <Box
            border={1}
            borderRadius={5}
            borderColor={"white"}
            borderWidth={1}
            borderStyle={"solid"}
            my={2}
            mx={12}
          />
          <Box mb={12}>
            <Box>
              <TouchableOpacity
                onPress={() => {
                  auth().signInAnonymously();
                }}
              >
                <AuthButton
                  alginItems={"center"}
                  justifyContent={"center"}
                  mx={12}
                >
                  <AuthButtonText>{"Login Anon"}</AuthButtonText>
                </AuthButton>
              </TouchableOpacity>
            </Box>
          </Box>
        </Flex>
      </SafeAreaView>
    </ImageBackground>
  );
};
