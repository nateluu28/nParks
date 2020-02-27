import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flex } from "@houseme-networks/rental-primitives";
import { Header } from "../../../../components";

export const NewsLandingScreen = () => {
  return (
    <SafeAreaView>
      <Flex>
        <Header color={"lightgrey"}>{"News landing page"}</Header>
      </Flex>
    </SafeAreaView>
  );
};
