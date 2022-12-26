importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }
firebase.initializeApp({
    apiKey: "AIzaSyCrep9d13_blJYg30GGLaI2SFpBoGd_N4w",
    authDomain: "grantbiz-bf7fb.firebaseapp.com",
    // databaseURL: "https://fir-cloud-messaging-9bd43.firebaseio.com",
    projectId: "grantbiz-bf7fb",
    storageBucket: "grantbiz-bf7fb.appspot.com",
    messagingSenderId: "361173622830",
    appId: "1:361173622830:web:359d2eac2ad9d5c58cbfbf"

})

const initMessaging = firebase.messaging()