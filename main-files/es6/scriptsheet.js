/*global console,document,alert,$,window */
/*jslint es6 */

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCe1QexEQjRbiM-1zubU2qXJAzn1tgdvfI",
    authDomain: "fire-cafe-f1.firebaseapp.com",
    databaseURL: "https://fire-cafe-f1.firebaseio.com",
    projectId: "fire-cafe-f1",
    storageBucket: "fire-cafe-f1.appspot.com",
    messagingSenderId: "467461343011"
};
firebase.initializeApp(config);
const dataBase = firebase.firestore();
dataBase.settings({timestampsInSnapshots: true});

    // Start Project
dataBase.collection('Coffees').get().then((snapshot) => {
    'use strict';
    console.log(snapshot.docs);
});