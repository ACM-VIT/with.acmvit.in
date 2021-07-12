// var admin = require("firebase-admin");
// const config = require("config");
// const serviceAccount = config.get('CREDENTIALS');

const express = require("express");
const maps = require("./map");
const app = express();
const port = 3000;

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// let get_data = async () => {
//   const collectionQuerySnapshot = await db
//     .collection("domainKeys")
//     .doc("cdRsoDCvIcIt4MpEkVbR")
//     .get();
//   return collectionQuerySnapshot.data();
// };

app.get("", (req, res) => {
  res.redirect("https://bootcamp.acmvit.in/");
});

// redirect :id to specific webpage
app.get("/:id", async function (req, res) {
  const param = req.params.id;
  let redirect_to = maps.map(({ title, url }) => {
    if (title == param) return url;
  });

  if (redirect_to[0] === undefined) {
    redirect_to = `https://bootcamp.acmvit.in/`;
  }

  return res.redirect(301, redirect_to);
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
