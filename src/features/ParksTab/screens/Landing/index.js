import React, { useState, useEffect } from "react";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { ActivityIndicator, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Button } from "../../../../components";
import { ScrollView } from "react-native-gesture-handler";
import { getParksInState, processLatLong } from "../../../../api/nps/index";
import { sortObjectsByLatLong } from "../../../../api/geo/index";
import { ParkPreview } from "../../components/ParkPreview";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const loadingMessages = [
  {
    message: "Taming the Bears",
    icon: null
  },
  {
    message: "Watering the Trees",
    icon: null
  },
  {
    message: "Taking a picture"
  },
  {
    message: "Tucking in the Deer"
  },
  {
    message: "Counting the Squirrels"
  }
];

const FetchingParksIndicator = () => {
  const loadingMessage =
    loadingMessages[getRandomInt(1, loadingMessages.length - 1)];
  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
      <ActivityIndicator />
      <Header fontSize={20} color={"black"} textAlign={"center"}>
        {loadingMessage.message}
      </Header>
    </Flex>
  );
};

export const ParksLandingScreen = () => {
  const [parks, setParks] = useState(null);
  const [gettingParks, setGettingParks] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [canLoadMoreParks, setCanLoadMoreParks] = useState(false);

  const getParks = async ({ pageNumber = 0, limit = 10, merge = true }) => {
    setGettingParks(true);
    var newParks = await getParksInState("CA", limit, pageNumber, ["images"]);
    const oldParks = parks;

    if (newParks.length < limit) {
      setCanLoadMoreParks(false);
    } else {
      setCanLoadMoreParks(true);
    }

    console.log(newParks);

    newParks = newParks.map(park => {
      if (!park.latLong) {
        return { ...park, latLong: null };
      } else {
        return { ...park, latLong: processLatLong(park.latLong) };
      }
    });

    var newParksArray = [];
    if (merge && oldParks) {
      newParksArray = [...oldParks, ...newParks];
    } else {
      newParksArray = newParks;
    }

    newParksArray = [...new Set(newParksArray)];

    const sortedParks = sortObjectsByLatLong({
      field: "latLong",
      objects: newParksArray,
      lat: 37.97878,
      long: -121.310667
    });

    console.log("Sorted");
    console.log(sortedParks);

    setParks(sortedParks);

    setGettingParks(false);
  };

  useEffect(() => {
    if (!parks && !gettingParks) {
      console.log("Getting parks");
      getParks({});
    }
    return () => {
      // cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gettingParks) {
    return <FetchingParksIndicator />;
  } else {
    return (
      <SafeAreaView>
        <ScrollView
          style={{
            height: "100%"
          }}
        >
          {parks &&
            parks.map(park => {
              return <ParkPreview key={park.id} park={park} />;
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
  }
};
