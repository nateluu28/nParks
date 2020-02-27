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

const db = getFirestoreReference();

const geofirestore = new GeoFirestore(db);
const geocollection = geofirestore.collection("parks");

const query = geocollection.near({
  center: new admin.firestore.GeoPoint(40.7589, -73.9851),
  radius: 1000
});

// Get query (as Promise)
query.get().then(value => {
  // All GeoDocument returned by GeoQuery, like the GeoDocument added above
  console.log(value.docs);
});
