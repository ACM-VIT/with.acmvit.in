require("dotenv").config();

const config = require("config");
const admin = require("firebase-admin");
const express = require("express");

const app = express();
const port = 3000;

const serviceAccountObject = {
  type: "service_account",
  project_id: "acm-keyholder",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAILL,
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountObject),
});

const db = admin.firestore();

let routeMaps = [];

const get_data = async () => {
  const collectionQuerySnapshot = await db
    .collection("domainKeys")
    .doc("cdRsoDCvIcIt4MpEkVbR")
    .get();
  routeMaps = await collectionQuerySnapshot.data();
  return routeMaps;
};

/** run the get_data route to fetch more results */
app.get("/update", async (req, res) => {
  const data = await get_data();
  return res.json(data);
});

// // redirect :id to specific webpage
// app.get("/:id", async function (req, res) {
//   const param = req.params.id;
//   res.redirect(301, routeMaps[param]);
// });

app.listen(port);
