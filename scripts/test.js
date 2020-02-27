const admin = require("firebase-admin");

const {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot
} = require("geofirestore");

function getFirestoreReference() {
  const serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  return admin.firestore();
}

const fs = require("fs");

console.log("Loading park data ...");
const parkData = JSON.parse(fs.readFileSync("parks.json"));
console.log(`Loaded ${Object.keys(parkData).length} parks`);

function processLatLong(latlong) {
  const splitString = latlong.split(",");
  return {
    lat: splitString[0].replace("lat:", ""),
    long: splitString[1].replace("long:", "")
  };
}

const db = getFirestoreReference();

// const collectionReference = db.collection("parks-test");

const geofirestore = new GeoFirestore(db);
const geocollection = geofirestore.collection("parks");
const collectionReference = db.collection("parks-no-geo");

Object.keys(parkData).forEach(parkCode => {
  //   const docRef = collectionReference.doc(parkCode);

  // Convert states to an array
  parkData[parkCode]["states"] = parkData[parkCode]["states"].split(",");
  parkData[parkCode]["code"] = parkCode;

  // Remove weather data
  delete parkData[parkCode]["weatherInfo"];

  // Remove driving directions url
  delete parkData[parkCode]["directionsUrl"];

  // Remove url
  delete parkData[parkCode]["url"];

  if (parkData[parkCode]["latLong"]) {
    // Get the lat long
    const { lat, long } = processLatLong(parkData[parkCode]["latLong"]);

    // Set the coords.
    parkData[parkCode].coordinates = new admin.firestore.GeoPoint(
      parseFloat(lat),
      parseFloat(long)
    );

    // Remove the lat long
    delete parkData[parkCode]["latLong"];
    geocollection.add(parkData[parkCode]);
  } else {
    parkData[parkCode]["latLong"];
    const docRef = collectionReference.doc();
    docRef.set(parkData[parkCode]);
  }
});
