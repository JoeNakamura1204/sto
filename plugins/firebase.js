import firebase from 'firebase'

if (!firebase.apps.length) {
   var firebaseConfig = {
     apiKey: "AIzaSyDK-loW4_eSjFT_U9APqBwmc4DHMA-JEOc",
     authDomain: "sto-platform-eae23.firebaseapp.com",
     databaseURL: "https://sto-platform-eae23.firebaseio.com",
     projectId: "sto-platform-eae23",
     storageBucket: "sto-platform-eae23.appspot.com",
     messagingSenderId: "278721867599",
     appId: "1:278721867599:web:fddaffa96f6478af"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
}

export default firebase

