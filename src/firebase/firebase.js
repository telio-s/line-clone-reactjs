import React from "react";
import firebase from "../firebase";

const messaging = firebase.messaging();

export const sendRequestPost = (token, title, body) => {
  const apiKey =
    "AAAAPYGtVXI:APA91bEhKY7rh7yjT27dOJESU9GoyYya45_m37ovOxfBLnem_F1xIP5wG0lWwvlfKDXbUR5i6DuM3JFtJewviKaa_g_R8yxaJtXrZEu3VBr2DtP8GJo5MeZXIXilBAFIu2hX6vx4rw_o";
  fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: new Headers({
      Authorization: "key=" + apiKey,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      to: token,
      notification: {
        title: title,
        body: body,
      },
    }),
  })
    .then((response) => {
      if (response.status < 200 || response.status >= 400) {
        throw (
          "Error subscribing to topic: " +
          response.status +
          " - " +
          response.text()
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getToken = async () => {
  return await messaging
    .getToken({
      vapidKey:
        "BEMXfS0i4Ojf_Zwsln4wh9gfnyIeMjRhNyU_wIwsaZiaBMdJZc0fKZefROwEtSwSHx14CnvQtYVmr7Ekbp2tq3A",
    })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        return null;
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      return null;
      // ...
    });
};
