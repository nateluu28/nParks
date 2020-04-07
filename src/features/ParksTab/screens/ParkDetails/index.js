import React, { useState, useEffect } from "react";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { Header, AbsoluteButton, AbsoluteBox } from "../../../../components";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { ImageBackground, Text } from "react-native";
import { ContactCard, OperatingHours } from "../../components";
import SafeAreaView from "react-native-safe-area-view";
import { BackButton } from "../../../../components/BackButton/index";
import { BackedView } from "../../../../components/BackedView";
import FastImage from "react-native-fast-image";
import { getParkDetails, getParkAlerts } from "../../../../api/nps/index";
import { ParkAlertsBanner } from "../../components/ParkAlertsBanner";
import { showLocation } from "react-native-map-link";
import {
  useParksCache,
  getParkUpdates,
} from "../../../../providers/Parks/index";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faClock,
  faCamera,
  faMapSigns,
} from "@fortawesome/pro-light-svg-icons";
import { useDarkMode } from "react-native-dark-mode";
import { BackWithActions } from "../../../../components/BackWithActions";

export const ParkDetailsScreen = ({ navigation, route }) => {
  const {
    id,
    fullName,
    description,
    images,
    parkCode,
    coordinates,
    documentID,
    ...rest
  } = route.params;

  const [NPSParkDetails, setNPSParkDetails] = useState(false);

  const parksCache = useParksCache();
  const isDarkMode = useDarkMode();
  useEffect(() => {
    async function fetchParkDetails(parkCode) {
      const parkDetails = await getParkUpdates(parksCache, parkCode);
      console.log(parkDetails);
      setNPSParkDetails(parkDetails);
    }

    fetchParkDetails(parkCode);
  }, [parkCode]);

  return (
    <SafeAreaView forceInset={{ top: "never" }}>
      <ScrollView style={{ height: "100%" }}>
        <Box height={150}>
          <FastImage
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            source={{
              uri: images[0].url,
            }}
          />
        </Box>

        <Flex flexDirection={"column"}>
          <Box mx={12} mt={4}>
            <Header fontSize={14} color={isDarkMode ? "white" : "black"}>
              {`${fullName}`.toUpperCase()}
            </Header>
          </Box>
          <Box>
            <Box mx={12} mt={2}>
              <Text
                style={{
                  color: "grey",
                }}
              >
                {description}
              </Text>
            </Box>

            <TouchableHighlight
              underlayColor={"transparent"}
              disabled={!NPSParkDetails || !NPSParkDetails.operatingHours}
              onPress={() => {
                navigation.navigate("Parks.Details.Hours", {
                  operatingHours: NPSParkDetails.operatingHours,
                });
              }}
            >
              <Box
                bg={"black"}
                p={2}
                m={2}
                borderWidth={2}
                borderColor={isDarkMode ? "white" : "black"}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"row"}
                >
                  <FontAwesomeIcon icon={faClock} color={"white"} />
                  <Box ml={1}>
                    <Header fontSize={14}>{"See Operating Hours"}</Header>
                  </Box>
                </Flex>
              </Box>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={"transparent"}
              disabled={!NPSParkDetails || !NPSParkDetails.operatingHours}
              onPress={() => {
                console.log(rest);
                const { _latitude: lat, _longitude: lon } = coordinates;
                showLocation({
                  latitude: lat,
                  longitude: lon,
                  title: `${fullName}`,
                  dialogTitle: "Open in Maps",
                });
              }}
            >
              <Box
                bg={"black"}
                p={2}
                mx={2}
                mb={2}
                borderWidth={2}
                borderColor={isDarkMode ? "white" : "black"}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"row"}
                >
                  <FontAwesomeIcon icon={faMapSigns} color={"white"} />
                  <Box ml={1}>
                    <Header fontSize={14}>{"Get Directions"}</Header>
                  </Box>
                </Flex>
              </Box>
            </TouchableHighlight>

            {NPSParkDetails && NPSParkDetails.contacts && (
              <ContactCard {...NPSParkDetails.contacts} />
            )}
            <Box mb={2} />
            {(!images || images.length < 2) && (
              <Flex
                height={150}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
              >
                <FontAwesomeIcon icon={faCamera} color={"grey"} size={35} />
                <Header fontSize={14} color={"grey"}>
                  {"No Pictures to Display"}
                </Header>
              </Flex>
            )}
            {images.slice(1).map((image) => {
              return (
                <Box height={150}>
                  <FastImage
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                    source={{
                      uri: image.url,
                      cache: FastImage.cacheControl.web,
                      priority: FastImage.priority.low,
                    }}
                  />
                  <Box
                    height={"100%"}
                    width={"100%"}
                    zIndex={-1}
                    bg={"lightgrey"}
                  />
                </Box>
              );
            })}
          </Box>
        </Flex>
      </ScrollView>
      <ParkAlertsBanner parkCode={parkCode} />
      <BackWithActions documentID={documentID} />
    </SafeAreaView>
  );
};
