

function saveParkAsFav(parkCode)
{
    const { uid } = auth.user;
    const docRef = firestore().collection("favorites").doc(uid);

    docRef.set({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        parks: firebase.firestore.FieldValue.arrayUnion(parkCode)
    },
    {
        merge: true
    });

}

function removeParkFromFav(parkCode)
{
    const { uid } = auth.user;
    const docRef = firestore().collection("favorites").doc(uid);

    docRef.update({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        parks: firebase.firestore.FieldValue.arrayRemove(parkCode)
    })
    
    docRef.get().then(function(doc) {
        if (doc.data().parks.length == 0)
        {
            docRef.delete();
        }
    })

}

function getParksFromFav()
{
    const { uid } = auth.user;
    const docRef = firestore().collection("favorites").doc(uid);
    
    docRef.get().then(function(doc) {
        return doc.data().parks;
    })
}