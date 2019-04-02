import firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
const firebaseApp = firebase.initializeApp(config);

// Initialize Cloud Functions through Firebase
const functions = firebaseApp.functions()
export default functions