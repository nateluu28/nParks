// If you're using CommonJS/require syntax for imports you can do this:
const {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot
} = require("geofirestore");

const fs = require("fs");
const admin = require("firebase-admin");

function getFirestoreReference() {
  const serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  return admin.firestore();
}

// function processLatLong(latlong) {
//   const splitString = latlong.split(",");
//   return {
//     lat: splitString[0].replace("lat:", ""),
//     long: splitString[1].replace("long:", "")
//   };
// }

// var operationsLimit = 10;

// Create a Firestore reference
const db = getFirestoreReference();

const redColl = db.collection("test");
const redDocRef = redColl.doc();
redDocRef.set({
  why: "u no work"
});

console.log("Set testing doc");

process.exit(2);

// Create a GeoCollection reference
const geofirestore = new GeoFirestore(firestore);
const geoCollection = geofirestore.collection("parks");
const dbCollection = firestore.collection("parks");

Object.keys(parkData).forEach(parkCode => {
  if (operationsLimit > 0) {
    operationsLimit -= 1;
  } else {
    process.exit(2);
  }

  // Convert states to an array
  parkData[parkCode]["states"] = parkData[parkCode]["states"].split(",");
  parkData[parkCode]["code"] = parkCode;

  // Remove weather data
  delete parkData[parkCode]["weatherInfo"];

  // Remove driving directions url
  delete parkData[parkCode]["directionsUrl"];

  // Remove url
  delete parkData[parkCode]["url"];

  // Create a GeoFirestore reference
  if (parkData[parkCode]["latLong"]) {
    // Get the lat long
    const { lat, long } = processLatLong(parkData[parkCode]["latLong"]);

    // Set the coords.
    parkData[parkCode]["coordinates"] = new admin.firestore.GeoPoint(
      parseFloat(lat),
      parseFloat(long)
    );

    // Remove the lat long
    delete parkData[parkCode]["latLong"];
  } else {
    parkData[parkCode]["latLong"];
  }

  const docRef = dbCollection.doc();
  docRef.set({
    ...parkData[parkCode]
  });

  //   if (parkData[parkCode]["coordinates"]) {
  //     // Add a GeoDocument to a GeoCollection
  //     geoCollection.add({
  //       ...parkData[parkCode]
  //     });
  //   } else {
  //     // Set a normal document
  //     const docRef = dbCollection.doc(parkCode);
  //     docRef.set(parkData[parkCode]);
  //   }
});
