import React from "react";
import { Text, Alert } from "react-native";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useActionSheet } from "@expo/react-native-action-sheet";

export const callNumber = phone => {
  console.log("Calling ... ");
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};

export const sendEmail = email => {
  console.log("Emailing ... ");
  const emailLink = `mailto:${email}`;

  Linking.canOpenURL(emailLink)
    .then(supported => {
      if (!supported) {
        Alert.alert("Email is not available");
      } else {
        return Linking.openURL(emailLink);
      }
    })
    .catch(err => console.log(err));
};

export const ContactCard = ({ phoneNumbers, emailAddresses }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <Box bg={"white"}>
      <Flex
        mx={10}
        my={10}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"row"}
      >
        {phoneNumbers && (
          <TouchableOpacity
            onPress={() => {
              //   callNumber(phoneNumbers[0]);

              const options = phoneNumbers.map(phoneNumberObject => {
                return `${phoneNumberObject.phoneNumber} | ${phoneNumberObject.type}`;
              });

              options.push("Cancel");
              const cancelButtonIndex = options.length - 1;

              console.log(options);

              showActionSheetWithOptions(
                {
                  options,
                  cancelButtonIndex
                },
                buttonIndex => {
                  callNumber(phoneNumbers[buttonIndex].phoneNumber);
                }
              );
            }}
          >
            <Text>{"Call"}</Text>
          </TouchableOpacity>
        )}
        {phoneNumbers && emailAddresses && <Text>{" | "}</Text>}
        {emailAddresses && (
          <TouchableOpacity
            onPress={() => {
              //   callNumber(phoneNumbers[0]);

              const options = emailAddresses.map(emailObject => {
                return `${emailObject.emailAddress}`;
              });

              options.push("Cancel");
              const cancelButtonIndex = options.length - 1;

              console.log(options);

              showActionSheetWithOptions(
                {
                  options,
                  cancelButtonIndex
                },
                buttonIndex => {
                  sendEmail(emailAddresses[buttonIndex].emailAddress);
                }
              );
            }}
          >
            <Text>{"Email"}</Text>
          </TouchableOpacity>
        )}
      </Flex>
    </Box>
  );
};
