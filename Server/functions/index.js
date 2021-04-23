const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');
admin.initializeApp();
const app = express();

app.get('/', (req, res) => {
    const snapshot = await admin.firestore().collection('locations').get();

    let locations = [];
    snapshot.forEach(doc =>{
        let id = doc.id;
        let data = doc.data();

        locations.push({id, ...data});
    });

    res.status(200).send(JSON.stringify);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
