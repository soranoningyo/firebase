"use strict";$(function(){$('input[type="text"]').tooltip({trigger:"manual"})});var config={apiKey:"AIzaSyCe1QexEQjRbiM-1zubU2qXJAzn1tgdvfI",authDomain:"fire-cafe-f1.firebaseapp.com",databaseURL:"https://fire-cafe-f1.firebaseio.com",projectId:"fire-cafe-f1",storageBucket:"fire-cafe-f1.appspot.com",messagingSenderId:"467461343011"};firebase.initializeApp(config);var dataBase=firebase.firestore(),cafeList=document.querySelector("#cafe-list");function renderCafe(e){var t=document.createElement("li"),a=document.createElement("span"),i=document.createElement("span"),n=document.createElement("span"),o=document.createElement("button");t.setAttribute("data-id",e.id),a.textContent=e.data().Coffee,i.textContent=e.data().City,n.textContent=e.data().Price,o.setAttribute("class","closer fas fa-trash-alt"),t.appendChild(a),t.appendChild(i),t.appendChild(n),t.appendChild(o),cafeList.appendChild(t),o.addEventListener("click",function(e){var t=e.target.parentElement.getAttribute("data-id");dataBase.collection("Coffees").doc(t).delete()})}dataBase.collection("Coffees").orderBy("City").onSnapshot(function(e){e.docChanges().forEach(function(e){if("added"==e.type)renderCafe(e.doc);else if("removed"==e.type){var t=cafeList.querySelector("[data-id="+e.doc.id+"]");cafeList.removeChild(t)}})});var newCoffee=document.getElementById("add-cafe-form");newCoffee.addEventListener("submit",function(e){e.preventDefault(),""===newCoffee.Coffee.value||""===newCoffee.City.value||""===newCoffee.Price.value?(""===newCoffee.Coffee.value&&($('input[name="Coffee"]').tooltip("show"),setTimeout(function(){$('input[name="Coffee"]').tooltip("hide")},3e3)),""===newCoffee.City.value&&($('input[name="City"]').tooltip("show"),setTimeout(function(){$('input[name="City"]').tooltip("hide")},3e3)),""===newCoffee.Price.value&&($('input[name="Price"]').tooltip("show"),setTimeout(function(){$('input[name="Price"]').tooltip("hide")},3e3))):(dataBase.collection("Coffees").add({Coffee:newCoffee.Coffee.value,City:newCoffee.City.value,Price:newCoffee.Price.value}),newCoffee.Coffee.value="",newCoffee.City.value="",newCoffee.Price.value="")});