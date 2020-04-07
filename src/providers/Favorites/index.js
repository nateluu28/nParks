import React from "react";
import storage from "../../storage/legacy/index";

const FavoriteContext = React.createContext();

class FavoriteProvider extends React.Component {
  // Context State
  state = {
    favorites: [],
  };

  componentDidMount() {
    const fetchFavorites = async () => {
      const loadedFavsString = await storage.get("favs");

      let loadedFavs = JSON.parse(loadedFavsString);

      if (!loadedFavs || typeof loadedFavs !== typeof []) {
        loadedFavs = [];
      }

      console.log(`Loaded favs: ${loadedFavs}`);

      this.setState({ favorites: loadedFavs });
    };

    fetchFavorites();
  }

  componentWillUnmount() {
    const storeFavorites = async () => {
      console.log(`Storing Favorites ${documentID}`);

      const { favorites = [] } = this.state;

      await storage.set("favs", JSON.stringify(favorites));
    };
    storeFavorites();
  }

  setFavorites = (favorites) => {
    this.setState((prevState) => ({ favorites }));
  };

  addFavorite = (documentID) => {
    const storeFavorites = async (newFavs) => {
      await storage.set("favs", JSON.stringify(newFavs));
    };

    console.log(`Adding Favorite ${documentID}`);

    let { favorites = [] } = this.state;

    let newFavorites = [];

    console.log(JSON.stringify(favorites));

    if (typeof favorites !== "object") {
      console.log(typeof favorites);
    }

    if (!favorites || favorites.length < 1 || typeof favorites !== typeof []) {
      newFavorites = [documentID];
    } else if (favorites.includes(documentID)) {
      newFavorites = favorites;
    } else {
      newFavorites = favorites;
      newFavorites.push(documentID);
    }

    console.log(JSON.stringify(newFavorites));
    storeFavorites(newFavorites);
    this.setState({ favorites: newFavorites });
  };

  removeFavorite = (documentID) => {
    console.log(`Removing Favorite ${documentID}`);
    let { favorites = [] } = this.state;

    // if (favorites === undefined || typeof favorites !== "object") {
    //   console.log(JSON.stringify(favorites));
    //   favorites = [];
    // }

    if (!favorites) {
      this.setState({ favorites: [] });
    } else {
      if (favorites.includes(documentID)) {
        if (favorites.length > 1) {
          const newFavs = favorites.filter((value) => value != documentID);
          this.setState({
            favorites: newFavs,
          });
        } else {
          this.setState({
            favorites: [],
          });
        }
      } else {
        this.setState({ favorites: favorites });
      }
    }
  };

  render() {
    const { children } = this.props;
    const { favorites } = this.state;
    const { setFavorites, addFavorite, removeFavorite } = this;

    return (
      <FavoriteContext.Provider
        value={{
          favorites,
          setFavorites,
          addFavorite,
          removeFavorite,
        }}
      >
        {children}
      </FavoriteContext.Provider>
    );
  }
}

export default FavoriteContext;

export { FavoriteProvider };

// const FavoriteDispatchContext = React.createContext();

// function favoriteReducer(state, action) {
//   switch (action.type) {
//     case "load": {
//       const loadFavorites = async () => {
//         const loadedFavsString = await storage.get("favs");

//         let loadedFavs = JSON.parse(loadedFavsString);

//         if (!loadedFavs) {
//           loadedFavs = [];
//         }

//         console.log("Loaded FAVS");
//         console.log(loadedFavs);

//         favoriteReducer(state, {
//           type: "store",
//           payload: {
//             loadedFavorites: loadedFavs,
//           },
//         });

//         return;
//       };
//       loadFavorites();
//       return { ...state, loading: true };
//     }
//     case "store": {
//       const { loadedFavorites = [] } = action.payload;

//       console.log("Stored FAVS");
//       console.log(loadedFavorites);

//       return { favs: loadedFavorites, loaded: true, loading: false };
//     }
//     case "save": {
//       const savePark = async (favs = [], documentID) => {
//         favs.push(documentID);
//         await storage.set("favs", JSON.stringify(favs));
//       };

//       const { documentID } = action.payload;
//       const { favs = [] } = state;

//       if (favs.includes(documentID)) {
//         return { ...state, favs: favs };
//       } else {
//         savePark(favs, documentID);
//         return { ...state, favs: favs.push(documentID) };
//       }
//     }
//     case "unsave": {
//       const unsavePark = async (favs = [], documentID) => {
//         await storage.set(
//           "favs",
//           favs.filter((value) => value != documentID)
//         );
//       };

//       const { documentID } = action.payload;
//       const { favs = [] } = state;

//       if (!favs.includes(documentID)) {
//         return { ...state, favs: favs };
//       } else {
//         unsavePark(favs, documentID);
//         return { ...state, favs: favs.filter((value) => value != documentID) };
//       }
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

// function FavoritesProvider({ children }) {
//   const [state, dispatch] = React.useReducer(favoriteReducer, {
//     favs: [],
//     loaded: false,
//     loading: false,
//   });
//   return (
//     <FavoriteStateContext.Provider value={state}>
//       <FavoriteDispatchContext.Provider value={dispatch}>
//         {children}
//       </FavoriteDispatchContext.Provider>
//     </FavoriteStateContext.Provider>
//   );
// }

// function savePark(documentID) {
//   const context = React.useContext(FavoriteDispatchContext);
//   if (context === undefined) {
//     throw new Error(
//       "useFavoritesCache must be used within a FavoritesProvider"
//     );
//   }
//   context({
//     type: "save",
//     payload: {
//       documentID,
//     },
//   });
// }

// function unsavePark(documentID) {
//   const context = React.useContext(FavoriteDispatchContext);
//   if (context === undefined) {
//     throw new Error(
//       "useFavoritesCache must be used within a FavoritesProvider"
//     );
//   }
//   context({
//     type: "unsave",
//     payload: {
//       documentID,
//     },
//   });
// }

// function isFavorite(documentID) {
//   const context = React.useContext(FavoriteStateContext);
//   if (context === undefined) {
//     throw new Error(
//       "useFavoritesCache must be used within a FavoritesProvider"
//     );
//   }

//   console.log(FavoriteStateContext);

//   const { favs } = FavoriteStateContext;

//   console.log("FAVS");
//   console.log(favs);

//   return favs;
// }

// function useFavorites() {
//   const [isOnline, setIsOnline] = useState(null);
// }

// export { useFavorites, FavoritesProvider, savePark, unsavePark, isFavorite };
