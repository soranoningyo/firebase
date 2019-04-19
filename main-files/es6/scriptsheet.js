/*global console,document,alert,$,window,setTimeout */
/*jslint es6 */
'use strict';
// ...........
$(function () {
    $('input[type="text"]').tooltip({
        trigger: 'manual'
    });
});
// ...........
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
dataBase.settings({
    timestampsInSnapshots: true
});

// Start Project

// Viewing Docs

const cafeList = document.querySelector('#cafe-list');

    // Rendercafe Function

function renderCafe(doc) {
    let li = document.createElement('li'),
        name = document.createElement('span'),
        city = document.createElement('span'),
        price = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().Coffee;
    city.textContent = doc.data().City;
    price.textContent = doc.data().Price;

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(price);

    cafeList.appendChild(li);
}

// Get Collections

dataBase.collection('Coffees').get().then((snapshot) => {
    'use strict';
    snapshot.docs.forEach((doc) => {
        renderCafe(doc);
    });
});

// Send Collections
const newCoffee = document.getElementById('add-cafe-form');
newCoffee.addEventListener('submit', function (e) {


    e.preventDefault();
    if (newCoffee.Coffee.value === '' || newCoffee.City.value === '' || newCoffee.Price.value === ''){

        if (newCoffee.Coffee.value === '') {


            $('input[name="Coffee"]').tooltip('show');

            setTimeout(() => {

                $('input[name="Coffee"]').tooltip('hide');

            }, 3000);
        }
        if (newCoffee.City.value === '') {
            $('input[name="City"]').tooltip('show');
            setTimeout(() => {
                $('input[name="City"]').tooltip('hide');
            }, 3000);
        }
        if (newCoffee.Price.value === '') {
            $('input[name="Price"]').tooltip('show');
            setTimeout(() => {
                $('input[name="Price"]').tooltip('hide');
            }, 3000);
        }
    } else {
        dataBase.collection('Coffees').add({
            Coffee: newCoffee.Coffee.value,
            City: newCoffee.City.value,
            Price: newCoffee.Price.value
        });
    }
    newCoffee.Coffee.value = '';
    newCoffee.City.value = '';
    newCoffee.Price.value = '';
});