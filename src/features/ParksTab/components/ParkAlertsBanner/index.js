import React, { useState, useEffect } from "react";
import { AbsoluteBox, Header } from "../../../../components";
import { Text } from "react-native";
import { getParkAlerts } from "../../../../api/nps/index";
import { Box, Flex } from "@houseme-networks/rental-primitives";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faExclamationTriangle,
  faBookDead,
  faDoNotEnter,
  faInfoCircle,
} from "@fortawesome/pro-light-svg-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const ParkAlertsBanner = ({ parkCode }) => {
  const navigation = useNavigation();
  const [alerts, setAlerts] = useState(false);

  const [alertStatus, setAlertStatus] = useState("grey");
  const [alertMessage, setAlertMessage] = useState("");
  const [icon, setIcon] = useState(false);

  useEffect(() => {
    async function fetchParkAlerts(parkCode) {
      const parkAlerts = await getParkAlerts(parkCode);
      console.log(parkAlerts);
      setAlerts(parkAlerts);
    }

    fetchParkAlerts(parkCode);
  }, [parkCode]);

  useEffect(() => {
    const newAlertCounts = {};

    if (alerts) {
      // "Danger", "Caution", "Information", or "Park Closure"
      alerts.data.forEach((alert) => {
        const { category } = alert;

        if (!newAlertCounts[category]) {
          newAlertCounts[category] = 0;
        }

        newAlertCounts[category] += 1;
      });

      let alertMessage = "";

      if (newAlertCounts["Danger"]) {
        setAlertStatus("Danger");
        alertMessage = "Danger";
        setIcon(faBookDead);
      } else if (newAlertCounts["Caution"]) {
        setAlertStatus("Caution");
        alertMessage = "Caution";
        setIcon(faExclamationTriangle);
      } else if (newAlertCounts["Information"]) {
        setAlertStatus("Information");
        alertMessage = "Information Available";
        setIcon(faInfoCircle);
      } else if (newAlertCounts["Park Closure"]) {
        setAlertStatus("Park Closure");
        alertMessage = "Park Closures";
        setIcon(faDoNotEnter);
      }

      if (alerts.total == 2) {
        alertMessage += ` and one more alert`;
      } else if (alerts.total > 1) {
        alertMessage += ` + ${alerts.total - 1} more alerts`;
      }

      setAlertMessage(alertMessage);
    }
  }, [alerts]);

  if (!alerts || alerts.total < 1) {
    return null;
  }

  const bannerColor = () => {
    switch (alertStatus) {
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

  return (
    <AbsoluteBox screenPosition={"bottom"} bg={bannerColor()}>
      {alertMessage !== "" && (
        <TouchableHighlight
          underlayColor={"transparent"}
          onPress={() => {
            navigation.navigate("Parks.Details.Alerts", {
              ...alerts,
              message: alertMessage,
            });
          }}
        >
          <Flex
            mx={3}
            py={2}
            flexDirection={"row"}
            alignItems={"center"}
            width={"80%"}
          >
            {icon && <FontAwesomeIcon icon={icon} color={"white"} />}
            <Box ml={3}>
              <Header fontSize={"18"}>{`${alertMessage}`}</Header>
            </Box>
          </Flex>
        </TouchableHighlight>
      )}
    </AbsoluteBox>
  );
};
