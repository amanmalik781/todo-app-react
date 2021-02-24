import firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAZmHcBFpPRzl1kwJbDwIjv3WtE76hq_Lo",
  authDomain: "todo-app-5e04a.firebaseapp.com",
  projectId: "todo-app-5e04a",
  storageBucket: "todo-app-5e04a.appspot.com",
  messagingSenderId: "938583407064",
  appId: "1:938583407064:web:9328a2a08bcd4f619f5aad"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;