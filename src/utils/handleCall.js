import firebase from "./../firebase";
import "firebase/firestore";
import servers from "./stuns";
import { Dialog, IconButton } from "@material-ui/core";
import CallEndIcon from "@material-ui/icons/CallEnd";
import React, { useContext, useEffect } from "react";
import { DashboardContext } from "../Page/Dashboard";

const firestore = firebase.firestore();
let pc = null;
let localStream = null;
let remoteStream = null;

function handleCall() {
  const [open, setOpen] = useState(true);
  const { friend } = useContext(DashboardContext);

  useEffect(() => {
    call();
  }, []);

  function handleEndCall() {
    setOpen(!open);
    // hangup();
  }
  console.log("Naevis Calling");

  return (
    <Dialog open={open}>
      {remoteStream}
      <img src={""} />
      <h1>{friend.username}</h1>
      <IconButton onClick={() => handleEndCall()}>
        <CallEndIcon />
      </IconButton>
    </Dialog>
  );
}

async function call() {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });
  remoteStream = new MediaStream();

  pc = new RTCPeerConnection(servers);
  const rooms = firestore.collection("calls").doc(friend.id);
  const callerCandidates = rooms.collection("callerCandidates");
  const calleeCandidates = rooms.collection("calleeCandidates");

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  pc.addEventListener("icecandidate", (event) => {
    event.candidate && callerCandidates.add(event.candidate.toJSON());
  });

  pc.addEventListener("track", (event) => {
    console.log("Got remote track:", event.streams[0]);
    event.streams[0].getTracks().forEach((track) => {
      console.log("Add a track to the remoteStream:", track);
      remoteStream.addTrack(track);
    });
  });

  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };
  await rooms.set({ offer });
  // set room number to dynamodb

  rooms.onSnapshot(async (snapshot) => {
    const data = snapshot.data();
    if (pc.iceConnectionState !== "closed") {
      if (!pc.currentRemoteDescription && data.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        await pc.setRemoteDescription(answerDescription);
      }
    }
  });

  calleeCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
}

export default handleCall;
