import React, { useState, useEffect } from "react";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { ActivityIndicator, ImageBackground, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Button } from "../../../../components";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import {
  getParksInState,
  processLatLong,
  getNearbyParks,
  compareValues,
} from "../../../../api/nps/index";
import { sortObjectsByLatLong } from "../../../../api/geo/index";
import { ParkPreview } from "../../components/ParkPreview";
import {
  useParksCache,
  getParkDetails,
} from "../../../../providers/Parks/index";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTrees,
  faDeer,
  faFish,
  faSquirrel,
  faCamera,
} from "@fortawesome/pro-light-svg-icons";
import { useDarkMode } from "react-native-dark-mode";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const loadingMessages = [
  {
    message: "Swimming With the Fish",
    icon: null,
  },
  {
    message: "Watering the Trees",
    icon: null,
  },
  {
    message: "Taking a picture",
  },
  {
    message: "Tucking in the Deer",
  },
  {
    message: "Counting the Squirrels",
  },
];

const loadingIcons = [faFish, faTrees, faCamera, faDeer, faSquirrel];

const FetchingParksIndicator = () => {
  const messageIndex = getRandomInt(1, loadingMessages.length - 1);
  const loadingMessage = loadingMessages[messageIndex];
  const loadingIcon = loadingIcons[messageIndex];
  return (
    <Flex justifyContent={"center"} alignItems={"center"} flex={1} height={300}>
      <FontAwesomeIcon icon={loadingIcon} size={50} color={"grey"} />
      <Header fontSize={20} color={"grey"} textAlign={"center"}>
        {loadingMessage.message}
      </Header>
    </Flex>
  );
};

export const ParksLandingScreen = () => {
  const parksCache = useParksCache();
  const [parks, setParks] = useState(null);
  const [gettingParks, setGettingParks] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [canLoadMoreParks, setCanLoadMoreParks] = useState(false);
  const [distance, setDistance] = useState(50);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    if (!gettingParks) {
      console.log("Getting parks");
      const getParks = async ({ pageNumber = 0, limit = 10, merge = true }) => {
        setGettingParks(true);

        var parkDocuments = await getNearbyParks({
          lat: 37.97878,
          long: -121.310667,
          distance: distance,
        });

        parkDocuments.sort(compareValues("distance"));

        console.log(parkDocuments[0]);

        let nearbyParks = await Promise.all(
          parkDocuments.map(async (parkDocument) => {
            let { d: parkDetails } = await getParkDetails(
              parksCache,
              parkDocument.id
            );
            return { documentID: parkDocument.id, ...parkDetails };
          })
        );

        setParks(nearbyParks);
        setGettingParks(false);
      };
      getParks({});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Flex
          mx={12}
          m={3}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Header fontSize={16} color={isDarkMode ? "white" : "black"}>
            {"Distance"}
          </Header>

          <Flex flexDirection={"row"} justifyContent={"space-between"}>
            <Box mx={2}>
              <TouchableHighlight
                underlayColor={"transparent"}
                onPress={() => {
                  if (distance != 50) {
                    setDistance(50);
                  }
                }}
              >
                <Header
                  fontSize={16}
                  color={
                    distance === 50
                      ? "blue"
                      : isDarkMode
                      ? "lightgrey"
                      : "black"
                  }
                >
                  {"50"}
                </Header>
              </TouchableHighlight>
            </Box>
            <Box mx={2}>
              <TouchableHighlight
                underlayColor={"transparent"}
                onPress={() => {
                  if (distance != 150) {
                    setDistance(150);
                  }
                }}
              >
                <Header
                  fontSize={16}
                  color={
                    distance === 150
                      ? "blue"
                      : isDarkMode
                      ? "lightgrey"
                      : "black"
                  }
                >
                  {"150"}
                </Header>
              </TouchableHighlight>
            </Box>
            <Box ml={2}>
              <TouchableHighlight
                underlayColor={"transparent"}
                onPress={() => {
                  if (distance != 250) {
                    setDistance(250);
                  }
                }}
              >
                <Header
                  fontSize={16}
                  color={
                    distance === 250
                      ? "blue"
                      : isDarkMode
                      ? "lightgrey"
                      : "black"
                  }
                >
                  {"250"}
                </Header>
              </TouchableHighlight>
            </Box>
          </Flex>
        </Flex>
        {gettingParks && <FetchingParksIndicator />}

        {!gettingParks && (!parks || parks.length === 0) && (
          <Flex height={300} justifyContent={"center"} alignItems={"center"}>
            <FontAwesomeIcon icon={faTrees} size={50} color={"grey"} />
            <Header fontSize={20} color={"grey"}>
              {"It Doesn't Look There\nAre Any Parks Nearby"}
            </Header>
          </Flex>
        )}

        {parks &&
          parks.map((park) => {
            return <ParkPreview key={park.id} {...park} />;
          })}
        {canLoadMoreParks && (
          <Button
            mx={12}
            px={2}
            my={2}
            onPress={() => {
              if (!currentPage) {
                setCurrentPage(0);
              }

              getParks({ merge: true, pageNumber: currentPage + 1 });
              setCurrentPage(currentPage + 1);
            }}
            buttonText={"Load More Parks"}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
