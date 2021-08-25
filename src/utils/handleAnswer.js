import { firestore } from "firebase-admin";
import "firebase/firestore";
import React, { useContext } from "react";
import { SyncWaterfallHook } from "tapable";
import { DashboardContext } from "../Page/Dashboard";
import firebase from "./../firebase";
import servers from "./stuns";

const firestore = firebase.firestore();
let pc = null;
let remoteStream = new MediaStream();

function handleAnswer() {
  const { friend } = useContext(DashboardContext);
  //   answer();
}

async function answer() {
  const room = firestore.collection("rooms").doc(user.id);
  const callSnapshot = await room.get();
  const callerCandidates = room.collection("callerCandidates");
  const calleeCandidates = room.collection("calleeCandidates");

  if (callSnapshot.exists) {
    pc = new RTCPeerConnection(servers);
    pc.addEventListener("icecandidate", (event) => {
      event.candidate && calleeCandidates.add(event.candidate.toJSON());
    });

    pc.addEventListener("track", (event) => {
      console.log("Got remote track:", event.streams[0]);
      event.streams[0].forEach((track) => {
        console.log("Add a track to the remotestream:", track);
        remoteStream.addTrack(track);
      });
    });

    const offerDescription = callSnapshot.data().offer;
    await pc.setRemoteDescription(offerDescription);
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      sdp: answerDescription.sdp,
      type: answerDescription.type,
    };

    await room.update({ anwser });

    callerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  }
}
export default handleAnswer;
