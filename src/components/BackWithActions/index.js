import React, { useEffect, useState, useContext } from "react";
import { Box, Flex } from "@houseme-networks/rental-primitives";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BackedView } from "../BackedView";
import { Header } from "../Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes, faHeart } from "@fortawesome/pro-light-svg-icons";
import { AbsoluteBox } from "../AbsoluteBox";
import { AbsoluteFlex } from "../AbsoluteFlex";
import { TouchableHighlight } from "react-native-gesture-handler";
import FavoriteContext from "../../providers/Favorites/index";
import storage from "../../storage/legacy";

export const BackWithActions = ({ documentID, children }) => {
  const navigation = useNavigation();

  const { favorites, addFavorite, removeFavorite } = useContext(
    FavoriteContext
  );

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    try {
      console.log("CHECKING ...");
      console.log(favorites);
      setIsFav(
        favorites && favorites !== undefined && favorites.includes(documentID)
      );
    } catch (err) {
      setIsFav(false);
    }
  }, [favorites]);

  return (
    <AbsoluteFlex screenPosition={"top"}>
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        mx={12}
      >
        <Box flex={1}>
          <TouchableHighlight
            underlayColor={"transparent"}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <BackedView my={2} borderRadius={900} alignSelf={"flex-start"}>
              <Box px={2} py={2}>
                <FontAwesomeIcon icon={faTimes} />
              </Box>
            </BackedView>
          </TouchableHighlight>
        </Box>
        <Box flex={1}>
          <TouchableHighlight
            underlayColor={"transparent"}
            onPress={() => {
              if (isFav) {
                removeFavorite(documentID);
                setIsFav(false);
              } else {
                addFavorite(documentID);
                setIsFav(true);
              }
            }}
          >
            <BackedView my={2} borderRadius={900} alignSelf={"flex-end"}>
              <Box px={2} py={2}>
                <FontAwesomeIcon
                  icon={faHeart}
                  color={isFav ? "red" : "black"}
                />
              </Box>
            </BackedView>
          </TouchableHighlight>
        </Box>
      </Flex>
    </AbsoluteFlex>
  );
};
