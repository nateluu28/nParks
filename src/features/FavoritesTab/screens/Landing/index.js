import React, { useEffect, useState, useContext } from "react";
import storage from "../../../../storage/legacy";
import { Box, Flex } from "@houseme-networks/rental-primitives";
import SafeAreaView from "react-native-safe-area-view";
import { ScrollView } from "react-native-gesture-handler";
import { ParkPreview } from "../../../ParksTab/components";
import { useParksCache, getParkDetails } from "../../../../providers/Parks";
import { Header } from "../../../../components";
import { useDarkMode } from "react-native-dark-mode";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeartBroken } from "@fortawesome/pro-light-svg-icons";
import FavoriteContext from "../../../../providers/Favorites/index";
import { RefreshControl } from "react-native";
export const FavoritesLandingScreen = () => {
  const [favoriteParks, setFavoriteParks] = useState(false);
  const isDarkMode = useDarkMode();
  const parksCache = useParksCache();
  const [refreshing, setRefreshing] = useState(false);

  const { favorites } = useContext(FavoriteContext);

  useEffect(() => {
    console.log("Getting fav parks");
    const getParks = async ({ pageNumber = 0, limit = 10, merge = true }) => {
      let nearbyParks = await Promise.all(
        favorites.map(async (parkDocument) => {
          let { d: parkDetails } = await getParkDetails(
            parksCache,
            parkDocument
          );
          return { documentID: parkDocument, ...parkDetails };
        })
      );

      console.log(nearbyParks);

      setFavoriteParks(nearbyParks);
    };
    getParks({});
  }, [favorites, FavoriteContext]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    const loadParks = async () => {
      let nearbyParks = await Promise.all(
        favorites.map(async (parkDocument) => {
          let { d: parkDetails } = await getParkDetails(
            parksCache,
            parkDocument
          );
          return { documentID: parkDocument, ...parkDetails };
        })
      );

      console.log(nearbyParks);

      setFavoriteParks(nearbyParks);
      setRefreshing(false);
    };
    loadParks();
  }, [refreshing]);

  return (
    <SafeAreaView>
      <ScrollView
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Flex
          mx={12}
          m={3}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Header fontSize={22} color={isDarkMode ? "white" : "black"}>
            {"Favorites"}
          </Header>
        </Flex>
        {/* Header */}

        {(!favoriteParks || favoriteParks.length === 0) && (
          <Flex height={300} justifyContent={"center"} alignItems={"center"}>
            <FontAwesomeIcon icon={faHeartBroken} size={50} color={"grey"} />
            <Header fontSize={20} color={"grey"} textAlign={"center"}>
              {"It Looks Like You Haven't\nFavorited Any Parks Yet"}
            </Header>
          </Flex>
        )}

        {favoriteParks &&
          favoriteParks.length > 0 &&
          favoriteParks.map((favoritePark) => {
            return <ParkPreview {...favoritePark} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};
