import React, { useEffect, useState, useContext, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flex, Box } from "@houseme-networks/rental-primitives";
import { Header } from "../../../../components";
import { getParksNews } from "../../../../api/nps/index";
import FavoriteContext from "../../../../providers/Favorites/index";
import { useParksCache, getParkDetails } from "../../../../providers/Parks";
import { FlatList } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";
import { useDarkMode } from "react-native-dark-mode";
import { NewsArticle } from "../../components/NewsArticle/";

export const NewsLandingScreen = () => {
  const isDarkMode = useDarkMode();
  const { favorites } = useContext(FavoriteContext);
  const [refreshing, setRefreshing] = useState(false);
  const [newsArticles, setNewsArticles] = useState(false);

  // Get the cache
  const parksCache = useParksCache();

  const getNewsFromFavoriteParks = async () => {
    let favoriteParks = await Promise.all(
      await favorites.map(async (parkDocument) => {
        let { d: parkDetails } = await getParkDetails(parksCache, parkDocument);

        const { code } = parkDetails;

        return code;
      })
    );

    console.log("Park Codes", favoriteParks);

    const returnValue = await getParksNews(favoriteParks, false, 10, 0);

    console.log(returnValue);

    await setNewsArticles(returnValue);

    await setRefreshing(false);
  };

  useEffect(() => {
    getNewsFromFavoriteParks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNewsFromFavoriteParks();
  }, [refreshing]);

  return (
    <SafeAreaView>
      <FlatList
        style={{
          width: "100%",
          height: "100%",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <Flex
            mx={12}
            m={3}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Header fontSize={22} color={isDarkMode ? "white" : "black"}>
              {"News"}
            </Header>
          </Flex>
        }
        data={newsArticles}
        renderItem={({ item }) => {
          return (
            <NewsArticle
              newsTitle={item.title}
              newsURL={item.url}
              newsAbstract={item.abstract}
            />
          );
          console.log(item.image);
        }}
      />
    </SafeAreaView>
  );
};
