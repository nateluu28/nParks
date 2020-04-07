import firestore from "@react-native-firebase/firestore";

async function getParkDetailsFromFirestore(documentID) {
  if (!documentID) {
    return null;
  }

  const parkDocument = await firestore()
    .collection("parks")
    .doc(documentID)
    .get({ source: "server" });

  if (!parkDocument.exists) {
    console.error("A park was deleted!");
  }

  const { d: parkData } = parkDocument.data();

  if (!parkData) {
    console.error("Received badly formatted document!");
  }

  return parkData;
}

export { getParkDetailsFromFirestore };
