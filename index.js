var admin = require("firebase-admin");
var serviceAccount = require("./GOOGLE_APPLICATION_CREDENTIALS.json");

const express = require('express');
const app = express();
const port = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

let get_data = async () => {
    const collectionQuerySnapshot = await db.collection("domainKeys").doc('cdRsoDCvIcIt4MpEkVbR').get();
    return collectionQuerySnapshot.data();
}

// redirect :id to specific webpage
app.get('/:id', async function (req, res) {
    const param = req.params.id;
    const maps = get_data()
    // const redirect_to = maps.map(({ title, url }) => { if (title == param) return url; });
    res.redirect(301, maps[param]);
});

app.listen(port);
console.log('Server started at http://localhost:' + port);