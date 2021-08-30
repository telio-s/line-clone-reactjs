// See: https://github.com/microsoft/TypeScript/issues/14877
// [START messaging_init_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
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
// [END messaging_init_in_sw]

// [START messaging_on_background_message]
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
    data: payload.data.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END messaging_on_background_message]

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.", event);

  event.notification.close();

  event.waitUntil(clients.openWindow(event.notification.data));
});
