import React from "react";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { Header } from "../../../../components";
import { ScrollView } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";
import { ContactCard, OperatingHours } from "../../components";

export const ParkDetailsScreen = ({ navigation, route }) => {
  const {
    id,
    fullName,
    description,
    images,
    contacts,
    operatingHours,
    ...rest
  } = route.params;
  console.log(rest);
  return (
    <ScrollView style={{ height: "100%" }}>
      <Box height={150}>
        <ImageBackground
          style={{
            width: "100%",
            height: "100%"
          }}
          source={{
            uri: images[0].url
          }}
        >
          <Box width={"100%"} height={"100%"} bg={"#00000050"}>
            <Flex
              key={id}
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
        </ImageBackground>
      </Box>
      <ContactCard {...contacts} />
      <OperatingHours operatingHours={operatingHours} />
      <Flex flexDirection={"column"}>
        <Box>
          <Box mx={12} mt={2}>
            <Header color={"darkgrey"} fontSize={12}>
              {description}
            </Header>
          </Box>

          {Object.keys(rest).map(key => {
            return (
              <Header color={"black"} fontSize={12}>
                {`${key} : ${rest[key]}`}
              </Header>
            );
          })}
        </Box>
      </Flex>
    </ScrollView>
  );
};
