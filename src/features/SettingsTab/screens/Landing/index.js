import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { Header, Button } from "../../../../components";

import auth from "@react-native-firebase/auth";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";

export const SettingsLandingScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Flex>
          <Box mx={12} mt={10}>
            <Flex
              justifyContent={"center"}
              flexDirection={"row"}
              width={"100%"}
            >
              <Box
                width={120}
                height={120}
                overflow={"hidden"}
                borderRadius={100}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  source={require("../../../../assets/images/user-placeholder.png")}
                />
              </Box>
            </Flex>
            <Header color={"black"} fontSize={30}>
              {"Settings"}
            </Header>
          </Box>

          <Button
            my={2}
            mx={2}
            buttonText={"Log out"}
            onPress={() => {
              auth().signOut();
            }}
          />
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
};
