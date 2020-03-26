

function saveParkAsFav(parkCode)
{
    db = firebase.firestore(app);
          
    const { uid } = auth.user;
    const docRef = db.collection("favorites").doc(uid);

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
    db = firebase.firestore(app);

    const { uid } = auth.user;
    const docRef = db.collection("favorites").doc(uid);

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
    db = firebase.firestore(app);

    const { uid } = auth.user;
    const docRef = db.collection("favorites").doc(uid);

    docRef.get().then(function(doc) {
        return doc.data().parks;
    })

}

/*
var app = firebase.initializeApp({
    apiKey: ' AIzaSyANB951HXqOvrhverOBc7T0cIg4EIzRyDc ',
    authDomain: 'national-parks-4bfdd.firebaseapp.com',
    projectId: 'national-parks-4bfdd'
});
*/