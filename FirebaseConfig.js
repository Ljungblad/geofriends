import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBtSWIg1uOj-jIctdZBziy9Gth-5KoP74s",
  authDomain: "geofriends-98ada.firebaseapp.com",
  databaseURL: "https://geofriends-98ada.firebaseio.com",
  projectId: "geofriends-98ada",
  storageBucket: "geofriends-98ada.appspot.com",
  messagingSenderId: "369842882325",
  appId: "1:369842882325:web:0e434858c4b903b8da4b1c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
