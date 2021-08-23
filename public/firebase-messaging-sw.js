// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

firebase.initializeApp({
  apiKey: "AIzaSyDmM2x6lu0GiI6GdTSJ_Y7-OYNRLdto4tk",
  authDomain: "line-clone-557b2.firebaseapp.com",
  projectId: "line-clone-557b2",
  storageBucket: "line-clone-557b2.appspot.com",
  messagingSenderId: "264168625522",
  appId: "1:264168625522:web:2f170eeb6694fea820b9eb",
  measurementId: "G-MQGYS5R31Y",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

function onBackgroundMessage() {
  const messaging = firebase.messaging();

  // [START messaging_on_background_message]
  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  // [END messaging_on_background_message]
}
