import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { Box, Flex } from "@houseme-networks/rental-primitives";
import { Header, BackButton } from "../../../../components";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { useDarkMode } from "react-native-dark-mode";

import { Linking, Alert } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLink } from "@fortawesome/pro-light-svg-icons";

const boxColor = (category) => {
  switch (category) {
    case "Danger":
      return "red";
    case "Caution":
      return "orange";
    case "Information":
      return "blue";
    case "Park Closure":
      return "black";
  }
};

const openParkAlert = async (url) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.close();
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: "cancel",
        preferredBarTintColor: "#453AA4",
        preferredControlTintColor: "white",
        readerMode: false,
        animated: true,
        modalPresentationStyle: "overFullScreen",
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: "#6200EE",
        secondaryToolbarColor: "black",
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: "slide_in_right",
          startExit: "slide_out_left",
          endEnter: "slide_in_left",
          endExit: "slide_out_right",
        },
      });
    } else Linking.openURL(url);
  } catch (error) {
    Alert.alert(error.message);
  }
};

const ParkAlert = ({ title, id, description, category, url = "" }) => {
  return (
    <TouchableHighlight
      underlayColor={"transparent"}
      disabled={!url}
      onPress={() => {
        openParkAlert(url);
      }}
    >
      <Box bg={boxColor(category)} px={2}>
        <Box mt={2}>
          <Flex flexDirection={"column"}>
            {url !== "" && <FontAwesomeIcon icon={faLink} color={"white"} />}
            <Header fontSize={"10"} color={"lightgrey"}>
              {id}
            </Header>
          </Flex>
        </Box>
        <Box mt={1}>
          <Header fontSize={"18"} color={"white"}>
            {title}
          </Header>
        </Box>
        <Box my={2}>
          <Header fontSize={"12"}>{description}</Header>
        </Box>
      </Box>
    </TouchableHighlight>
  );
};

export const AlertDetails = ({ route, navigation }) => {
  const { message, data } = route.params;
  const isDarkMode = useDarkMode();

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        {message && (
          <Box mx={12} pt={5}>
            <Header
              fontSize={24}
              color={isDarkMode ? "white" : "black"}
            >{`${message}`}</Header>
          </Box>
        )}
        {data.map((parkAlert) => {
          console.log(parkAlert);
          return <ParkAlert {...parkAlert} />;
        })}
      </ScrollView>
      <BackButton />
    </SafeAreaView>
  );
};
