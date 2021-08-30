// import firebase from "firebase/app";
import firebase from "firebase";
import "firebase/messaging";
const config = {
  apiKey: "AIzaSyDmM2x6lu0GiI6GdTSJ_Y7-OYNRLdto4tk",
  authDomain: "line-clone-557b2.firebaseapp.com",
  projectId: "line-clone-557b2",
  storageBucket: "line-clone-557b2.appspot.com",
  messagingSenderId: "264168625522",
  appId: "1:264168625522:web:2f170eeb6694fea820b9eb",
  measurementId: "G-MQGYS5R31Y",
};
firebase.initializeApp(config);

// let self;

// self.addEventListener("notificationclick", function (event) {
//   console.log("[Service Worker] Notification click Received.");

//   event.notification.close();

//   // event.waitUntil(clients.openWindow("https://developers.google.com/web/"));
// });

export default firebase;
