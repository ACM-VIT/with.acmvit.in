const admin = require("firebase-admin");

/** load firebase configuration object */
const serviceAccountObject = {
  type: "service_account",
  project_id: "acm-keyholder",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAILL,
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.CERT_URL,
};

const config = {
  collection: "domainKeys",
  document: "cdRsoDCvIcIt4MpEkVbR",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountObject),
});

/**
 * function to fetch the route mappings from the firestore database
 * @returns <Array<{key:string, value:string}>> Array of key and value pairs
 */
const worker = async () => {
  /** create the admin client */

  /** get the firestore client */
  const db = admin.firestore();

  /** initiallize empty array to store routes */
  const routes = [];

  /** get the firestore collection */
  const snapshot = await db.collection(config.collection).doc(config.document);

  /** get the document from the collection */
  const maps = await snapshot.get().then((doc) => doc.data());

  console.log("fetching values from database");

  /** return the routes */
  return maps;
};

/** export the worker to be used in index.js*/
module.exports = { worker };
