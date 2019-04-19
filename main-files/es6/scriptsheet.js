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
// dataBase.settings({
//     timestampsInSnapshots: true
// });

// Start Project

// Viewing Docs

const cafeList = document.querySelector('#cafe-list');

    // Rendercafe Function

function renderCafe(doc) {
    let li = document.createElement('li'),
        name = document.createElement('span'),
        city = document.createElement('span'),
        price = document.createElement('span'),
        closer = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().Coffee;
    city.textContent = doc.data().City;
    price.textContent = doc.data().Price;
    closer.setAttribute('class', "closer fas fa-trash-alt");



    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(price);
    li.appendChild(closer);

    cafeList.appendChild(li);

    //  Deleting
    closer.addEventListener('click', (e) => {
        const id = e.target.parentElement.getAttribute('data-id');

        dataBase.collection('Coffees').doc(id).delete();

    });
}
// Get Collections

// dataBase.collection('Coffees').orderBy('Coffee').get().then((snapshot) => {
//     'use strict';

//     snapshot.docs.forEach((doc) => {
//         renderCafe(doc);
//     });

// });
// Real-time Listener
dataBase.collection('Coffees').orderBy('City').onSnapshot( (snapshot) => {

    let changes = snapshot.docChanges();

    changes.forEach( (change) => {

        if (change.type == 'added') {

            renderCafe(change.doc);

        } else if (change.type == 'removed') {

            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);

        }
    });
});

// Send Collections
const newCoffee = document.getElementById('add-cafe-form');
newCoffee.addEventListener('submit', function (e) {

    e.preventDefault();

    if (newCoffee.Coffee.value === '' || newCoffee.City.value === '' || newCoffee.Price.value === '') {

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

        newCoffee.Coffee.value = '';
        newCoffee.City.value = '';
        newCoffee.Price.value = '';

    }
});