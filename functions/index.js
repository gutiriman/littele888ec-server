const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const decodeJWT = require('./auth/decodeJWT');

const paymentIntent = require('./api/paymentintent');

const app = express();
const port = 8080;

app.use(express.json({
   verify: (req, res, buffer) => {
      console.log("verify");
      req['rawBody'] = buffer;
   }
}))
app.use(cors({ origin: true }));
app.use(decodeJWT);

app.post('/create-payment-intent', paymentIntent);

//app.listen(port, () => { console.log("server listening on port", port) });

exports.app = functions.https.onRequest(app);