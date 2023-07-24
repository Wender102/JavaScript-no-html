var firebaseConfig = {
    apiKey: "AIzaSyDuAcP0C9HeExnSW5V2TuRuN4Vvz8-zZ6I",
    authDomain: "e-commerceroupas.firebaseapp.com",
    projectId: "e-commerceroupas",
    storageBucket: "e-commerceroupas.appspot.com",
    messagingSenderId: "515160544339",
    appId: "1:515160544339:web:1ba1ec4901ba6c922da2a6"
}

firebase.initializeApp(firebaseConfig)

//? My code
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()
const storage = firebase.storage()