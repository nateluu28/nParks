import React from "react";
import { Box } from "@houseme-networks/rental-primitives";
import { OperatingHours } from "../../components";
import SafeAreaView from "react-native-safe-area-view";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { AbsoluteBox, BackedView } from "../../../../components";
import { Text } from "react-native";
export const OperatingHoursScreen = ({ route, navigation }) => {
  const { operatingHours } = route.params;
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <Box>
          <OperatingHours operatingHours={operatingHours} />
        </Box>
      </ScrollView>
      <AbsoluteBox screenPosition={"bottom"}>
        <TouchableHighlight
          underlayColor={"transparent"}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackedView mx={2} my={2} alignSelf={"flex-end"}>
            <Box p={2}>
              <Text>{"Back To Park Details"}</Text>
            </Box>
          </BackedView>
        </TouchableHighlight>
      </AbsoluteBox>
    </SafeAreaView>
  );
};
