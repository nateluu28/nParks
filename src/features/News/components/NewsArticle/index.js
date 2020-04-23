import React from "react";
import { Text, Image, StyleSheet, TouchableHighlight } from "react-native";
import { Linking, Alert } from "react-native";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { Header } from "../../../../components";
import { useDarkMode } from "react-native-dark-mode";
import InAppBrowser from "react-native-inappbrowser-reborn";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "rgb(0,122,255)",
    padding: 12,
    borderRadius: 6,
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 3,
    marginRight: 3,
  },
  textTitle: {
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 12,
  },
});

const openNews = async (url) => {
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

export const NewsArticle = ({ newsTitle, newsURL, newsAbstract }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const isDarkMode = useDarkMode();
  return (
    <Box style={styles.item}>
      <TouchableHighlight
        style={styles.button}
        underlayColor={"transparent"}
        onPress={() => {
          openNews(newsURL);
        }}
      >
        <Text>
          <Text style={styles.textTitle}>{newsTitle}</Text>
          {"\n"}
          <Text style={styles.text}>{newsAbstract}</Text>
        </Text>
      </TouchableHighlight>
    </Box>
  );
};
