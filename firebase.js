const firebaseAdmin = require('firebase-admin');
//firebaseAdmin.initializeApp()
let serviceAccount = require('./service-account.json');
firebaseAdmin.initializeApp({
   credential: firebaseAdmin.credential.cert(serviceAccount)
});

const db = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();

module.exports = {
   db,
   auth
};