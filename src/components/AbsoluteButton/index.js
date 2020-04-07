import React from "react";
import { Box } from "@houseme-networks/rental-primitives";
import { TouchableHighlight } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import { AbsoluteBox } from "../AbsoluteBox";

export const AbsoluteButton = ({
  children,
  onPress,
  screenPosition = "top",
}) => {
  return (
    <AbsoluteBox screenPosition={screenPosition}>
      <TouchableHighlight underlayColor={"transparent"} onPress={onPress}>
        <Box>{children}</Box>
      </TouchableHighlight>
    </AbsoluteBox>
  );
};
