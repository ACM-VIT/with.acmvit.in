var admin = require("firebase-admin");
var serviceAccount = require("process.env.CREDENTIALS");

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


// redirect :id to specific webpage
app.get('/:id', async function (req, res) {
    const param = req.params.id;
    const collectionQuerySnapshot = await db.collection("domainKeys").doc('cdRsoDCvIcIt4MpEkVbR').get();
    const maps = collectionQuerySnapshot.data();
    // const redirect_to = maps.map(({ title, url }) => { if (title == param) return url; });
    res.redirect(301, maps[param]);
});

app.listen(port);
console.log('Server started at http://localhost:' + port);