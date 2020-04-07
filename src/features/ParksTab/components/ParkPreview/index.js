import React from "react";
import { Box, Flex } from "@houseme-networks/rental-primitives";
import { ImageBackground } from "react-native";
import { Header } from "../../../../components";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

export const ParkPreview = ({ images, parkCode, fullName, ...rest }) => {
  const navigation = useNavigation();
  return (
    <Box height={150} mb={10} mx={12} bg={"grey"} borderRadius={7}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.push("Parks.Details", {
            images,
            parkCode,
            fullName,
            ...rest,
          });
        }}
      >
        {images && (
          <FastImage
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: -1,
              borderRadius: 7,
            }}
            source={{
              uri: images[0].url,
            }}
          />
        )}
        <Box width={"100%"} height={"100%"} bg={"#00000050"} borderRadius={7}>
          <Flex
            key={parkCode}
            py={5}
            px={2}
            width={"80%"}
            height={"100%"}
            flexDirection={"row"}
            flexWrap={"wrap"}
          >
            <Header fontSize={14}>{`${fullName}`.toUpperCase()}</Header>
          </Flex>
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  );
};
