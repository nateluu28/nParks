import React from "react";
import { Flex } from "@houseme-networks/rental-primitives";
import SafeAreaView from "react-native-safe-area-view";

export const AbsoluteFlex = ({ children, bg, screenPosition = "top" }) => {
  const forcedInset =
    screenPosition === "top" ? { top: "always" } : { bottom: "always" };

  const insets = screenPosition === "top" ? { top: 0 } : { bottom: 0 };

  return (
    <Flex position={"absolute"} width={1} bg={bg} {...insets}>
      <SafeAreaView forceInset={forcedInset}>{children}</SafeAreaView>
    </Flex>
  );
};
