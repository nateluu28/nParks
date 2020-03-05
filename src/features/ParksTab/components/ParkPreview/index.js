import React from "react";
import { Box, Flex } from "@houseme-networks/rental-primitives";
import { ImageBackground } from "react-native";
import { Header } from "../../../../components";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const ParkPreview = ({ park }) => {
  const navigation = useNavigation();
  return (
    <Box height={150} mb={10} mx={12} bg={"grey"} borderRadius={7}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.push("Parks.Details", { ...park });
        }}
      >
        <ImageBackground
          style={{
            width: "100%",
            height: "100%"
          }}
          source={{
            uri: park.images[0].url
          }}
        >
          <Box width={"100%"} height={"100%"} bg={"#00000050"}>
            <Flex
              key={park.id}
              py={5}
              px={2}
              width={"80%"}
              height={"100%"}
              flexDirection={"row"}
              flexWrap={"wrap"}
            >
              <Header fontSize={14}>{`${park.fullName}`.toUpperCase()}</Header>
            </Flex>
          </Box>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </Box>
  );
};
