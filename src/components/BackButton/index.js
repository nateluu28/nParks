import React from "react";
import { Box } from "@houseme-networks/rental-primitives";
import { Text } from "react-native";
import { AbsoluteButton } from "../AbsoluteButton";
import { useNavigation } from "@react-navigation/native";
import { BackedView } from "../BackedView";
import { Header } from "../Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";

export const BackButton = ({ screenPosition = "left", altText = "Back" }) => {
  const navigation = useNavigation();
  return (
    <AbsoluteButton
      screenPosition={"top"}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <BackedView
        mx={2}
        my={2}
        borderRadius={900}
        alignSelf={screenPosition === "left" ? "flex-start" : "flex-end"}
      >
        <Box px={2} py={2}>
          <FontAwesomeIcon icon={faTimes} />
        </Box>
      </BackedView>
    </AbsoluteButton>
  );
};
