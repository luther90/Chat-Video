const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyDFWXMW8ot5fw14_JODumqytCtwiZPC7C0",
    authDomain: "chatvideo-99e07.firebaseapp.com",
    projectId: "chatvideo-99e07",
    storageBucket: "chatvideo-99e07.appspot.com",
    messagingSenderId: "95403856571",
    appId: "1:95403856571:web:ca46dcb12de4349e290f9e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
    db: firebase.firestore(),
}