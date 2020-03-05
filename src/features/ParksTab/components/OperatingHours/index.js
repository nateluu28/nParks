import React from "react";
import { Text, Alert } from "react-native";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { Header } from "../../../../components";

// exceptions: []
// description: "Although this urban park is accessible 24 hours a day in most areas, most parking lots are open between sunrise to sunset."
// standardHours: {
//     wednesday: "All Day",
//     monday: "All Day",
//     thursday: "All Day",
//     sunday: "All Day",
//     tuesday: "All Day", …}
// name: "Most parking lots are open between sunrise to sunset."

const OperatingHourInfo = ({
  exceptions,
  description,
  standardHours,
  name
}) => {
  return (
    <Flex
      alginItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Text>{name}</Text>
      <Box mt={1}>
        <Text
          style={{
            color: "grey"
          }}
        >
          {description}
        </Text>
      </Box>
      <Flex flexWrap={"wrap"} flexDirection={"row"} mt={2}>
        {standardHours &&
          Object.keys(standardHours).map((standardHour, index) => {
            return (
              <Box width={1 / 2} mt={1}>
                <Header color={"black"} fontSize={10}>
                  {`${standardHour}`.toUpperCase()}
                </Header>
                <Text>{`${standardHours[standardHour]}`}</Text>
              </Box>
            );
          })}
      </Flex>
    </Flex>
  );
};

export const OperatingHours = ({ operatingHours }) => {
  return (
    <Flex mx={12}>
      {operatingHours.map(operatingHour => {
        return <OperatingHourInfo {...operatingHour} />;
      })}
      <Box my={2}>
        <Header color={"lightgrey"} fontSize={10} textAlign={"center"}>
          {"Operating hours are as provided by the National Parks Service".toUpperCase()}
        </Header>
      </Box>
    </Flex>
  );
};
