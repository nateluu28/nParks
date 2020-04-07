import React from "react";
import { Text, Alert } from "react-native";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { Header } from "../../../../components";
import { useDarkMode } from "react-native-dark-mode";

export const callNumber = (phone) => {
  console.log("Calling ... ");
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};

export const sendEmail = (email) => {
  console.log("Emailing ... ");
  const emailLink = `mailto:${email}`;

  Linking.canOpenURL(emailLink)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Email is not available");
      } else {
        return Linking.openURL(emailLink);
      }
    })
    .catch((err) => console.log(err));
};

export const ContactCard = ({ phoneNumbers, emailAddresses }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const isDarkMode = useDarkMode();
  return (
    <Flex flexDirection={"row"}>
      <Flex
        flex={1}
        bg={phoneNumbers ? "black" : "grey"}
        p={2}
        ml={2}
        borderWidth={2}
        borderColor={isDarkMode ? "white" : "black"}
      >
        <TouchableOpacity
          disabled={!phoneNumbers}
          onPress={() => {
            //   callNumber(phoneNumbers[0]);

            const options = phoneNumbers.map((phoneNumberObject) => {
              return `${phoneNumberObject.phoneNumber} | ${phoneNumberObject.type}`;
            });

            options.push("Cancel");
            const cancelButtonIndex = options.length - 1;

            console.log(options);

            showActionSheetWithOptions(
              {
                options,
                cancelButtonIndex,
              },
              (buttonIndex) => {
                if (buttonIndex === cancelButtonIndex) {
                  return;
                }

                callNumber(phoneNumbers[buttonIndex].phoneNumber);
              }
            );
          }}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"row"}
          >
            <Box>
              <FontAwesomeIcon icon={faPhone} color={"white"} />
            </Box>
            <Box ml={1}>
              <Header fontSize={14}>{"Call"}</Header>
            </Box>
          </Flex>
        </TouchableOpacity>
      </Flex>
      <Box m={1} />

      <Flex
        flex={1}
        bg={emailAddresses ? "black" : "grey"}
        p={2}
        mr={2}
        borderWidth={2}
        borderColor={isDarkMode ? "white" : "black"}
      >
        {emailAddresses && (
          <TouchableOpacity
            disabled={!emailAddresses}
            onPress={() => {
              //   callNumber(phoneNumbers[0]);

              const options = emailAddresses.map((emailObject) => {
                return `${emailObject.emailAddress}`;
              });

              options.push("Cancel");
              const cancelButtonIndex = options.length - 1;

              console.log(options);

              showActionSheetWithOptions(
                {
                  options,
                  cancelButtonIndex,
                },
                (buttonIndex) => {
                  if (buttonIndex === cancelButtonIndex) {
                    return;
                  }
                  sendEmail(emailAddresses[buttonIndex].emailAddress);
                }
              );
            }}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"row"}
            >
              <Box>
                <FontAwesomeIcon icon={faEnvelope} color={"white"} />
              </Box>
              <Box ml={1}>
                <Header fontSize={14}>{"Email"}</Header>
              </Box>
            </Flex>
          </TouchableOpacity>
        )}
      </Flex>
    </Flex>
  );
};
