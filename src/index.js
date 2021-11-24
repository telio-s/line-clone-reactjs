import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Amplify from "aws-amplify";
import config from "./aws-exports";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// var AWS = require("aws-sdk");
Amplify.configure(config);
console.log("nize tao");
// const dynamo = new AWS.DynamoDB({
//   region: "ap-southeast-1",
//   maxRetries: 10,
//   retryDelayOptions: {
//     base: 300,
//   },
// });
// console.log("dynamo", dynamo);
// AWS.events.on("retry", function (resp) {
//   console.log("nize", resp);
//   // Enable or disable retries completely.
//   // disabling is equivalent to setting maxRetries to 0.
//   // if (resp.error) resp.error.retryable = true;

//   // // retry all requests with a 2sec delay (if they are retryable)
//   // if (resp.error) resp.error.retryDelay = 2000;
//   if (resp.error && resp.error.retryable) {
//     var date = new Date();
//     console.log(
//       date,
//       "| Retrying request for the " + resp.retryCount + "th time."
//     );
//     console.log(date, "| Retry triggered by", resp.error.message);
//   }
// });
// const client = new DynamoDBClient({ region: "ap-southeast-1" });

debugger;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
