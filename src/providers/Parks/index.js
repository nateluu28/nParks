import React from "react";
import storage from "../../storage/legacy/index";
import { Cache } from "react-native-cache";
import { getParkDetailsFromFirestore } from "../../api/firestore/index";
import { getParkDetails as getNPSParkDetails } from "../../api/nps/index";

const PARKS_CACHE_STORAGE_KEY = "parks";
const PARKS_CACHE_MAX_ENTRIES = 200;

const ParkStateContext = React.createContext();
const ParkDispatchContext = React.createContext();

function parkReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ParkProvider({ children }) {
  const [state, dispatch] = React.useReducer(parkReducer, {
    cache: new Cache({
      namespace: PARKS_CACHE_STORAGE_KEY,
      policy: {
        maxEntries: PARKS_CACHE_MAX_ENTRIES,
      },
      backend: storage,
    }),
  });
  return (
    <ParkStateContext.Provider value={state}>
      <ParkDispatchContext.Provider value={dispatch}>
        {children}
      </ParkDispatchContext.Provider>
    </ParkStateContext.Provider>
  );
}

async function getParkDetails(cache, firebaseDocumentID) {
  // Check the cache for this park
  const value = await cache.get(firebaseDocumentID);

  if (value) {
    console.log("Fetching park details from cache!");
    return value;
  }

  console.log("Fetching park details from firestore!");

  // Park was not found within the cache, retrieve from firestore
  const parkDetails = await getParkDetailsFromFirestore(firebaseDocumentID);

  // Store this park in the cache
  await cache.set(firebaseDocumentID, {
    d: parkDetails,
    m: {
      r: Date.now(),
    },
  });

  return parkDetails;
}

async function getParkUpdates(cache, parkCode) {
  // Check the cache for this park
  const value = await cache.get(parkCode);

  if (value) {
    console.log("Fetching park details from cache!");
    return value.d;
  }

  console.log("Fetching park details from NPS!");

  // Park was not found within the cache, retrieve from firestore
  const parkDetails = await getNPSParkDetails(parkCode);

  // Store this park in the cache
  await cache.set(parkCode, {
    d: parkDetails,
    m: {
      r: Date.now(),
    },
  });

  return parkDetails;
}

function useParksState() {
  const context = React.useContext(ParkStateContext);
  if (context === undefined) {
    throw new Error("useParksState must be used within a ParksProvider");
  }
  return context;
}

function useParksDispatch() {
  const context = React.useContext(ParkDispatchContext);
  if (context === undefined) {
    throw new Error("useParksDispatch must be used within a ParksProvider");
  }
  return context;
}

function useParksCache() {
  const context = React.useContext(ParkStateContext);
  if (context === undefined) {
    throw new Error("useParksState must be used within a ParksProvider");
  }
  return context.cache;
}

export { useParksCache, getParkDetails, ParkProvider, getParkUpdates };
