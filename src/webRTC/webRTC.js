import firebase from "../firebase";
const firestore = firebase.firestore();

export const openMediaDevice = async () => {
  const remoteStream = new MediaStream();

  try {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    return [localStream, remoteStream];
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
};

export const createCall = async (
  peerConnection,
  remoteStream,
  localStream,
  idCall,
  onClose
) => {
  registerPeerConnectionListeners(peerConnection);
  const room = firestore.collection("calls").doc(idCall);
  const offerCandidates = room.collection("offerCandidates");
  const answerCandidates = room.collection("answerCandidates");

  // get tracks to localStream and push to peerConnection
  localStream.getTracks().forEach(async (track) => {
    await peerConnection.addTrack(track, localStream);
  });
  // listen to icecandidate event and add icecandidate (port,ip) to offerCandidates
  peerConnection.addEventListener("icecandidate", (event) => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  });

  peerConnection.addEventListener("track", (event) => {
    console.log("Got remote track:", event.streams[0]);
    event.streams[0].getTracks().forEach((track) => {
      console.log("Add a track to the remoteStream:", track);
      remoteStream.addTrack(track, remoteStream);
    });
  });

  // create offer (sdp: contains video/audio information and negotiate connection info)
  // setLocalDesCription with offer
  const offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription); // start generating icacandidates
  //then trigger icecandidate event (?-?)
  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };
  await room.set({ offer });

  //detect change in calls document (listen for remote answer)
  room.onSnapshot(async (snapshot) => {
    const data = snapshot.data();
    if (peerConnection.iceConnectionState !== "closed") {
      if (!peerConnection.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(answerDescription);
        //trigger track event
      }
    }
  });
  // when answered, add icecandidate to peerConnection
  answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      console.log("answerCandidates snapshot", change);
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        await peerConnection.addIceCandidate(candidate);
        //trigger icecandidate event
      }
      if (change.type === "removed") {
        console.log("answerCandidates removed");
        hangUpByOtherEnd(peerConnection, localStream, remoteStream, onClose);
      }
    });
  });
};

export const createAnswer = async (
  peerConnection,
  remoteStream,
  localStream,
  idCall,
  onClose
) => {
  console.log("create Answer", idCall);
  const room = firestore.collection("calls").doc(idCall);
  console.log(room);
  const callSnapshot = await room.get();
  const offerCandidates = room.collection("offerCandidates");
  const answerCandidates = room.collection("answerCandidates");

  if (callSnapshot.exists) {
    console.log("call snapshot is exists");
    registerPeerConnectionListeners(peerConnection);
    if (!localStream) {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
    }
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
    // listen to icecandidate event and add icecandidate (port,ip) to offerCandidates
    peerConnection.addEventListener("icecandidate", (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    });

    //listen to track event when track is added by remote user
    peerConnection.addEventListener("track", (event) => {
      console.log("Got remote track:", event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        console.log("Add a track to the remoteStream:", track);
        remoteStream.addTrack(track);
      });
    });
    // remoteVideo = remoteStream;
    // set remote with offer (establish connection ?-?)
    // and createAnswer
    const offerDescription = callSnapshot.data().offer;
    await peerConnection.setRemoteDescription(offerDescription);
    const answerDescription = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answerDescription);
    //then trigger icecandidate event (?-?)

    // and update to db
    const answer = {
      sdp: answerDescription.sdp,
      type: answerDescription.type,
    };
    await room.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        console.log("offerCandidate snapshot", change);
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          await peerConnection.addIceCandidate(candidate);
        }
        if (change.type === "removed") {
          console.log("offerCandidates removed");
          hangUpByOtherEnd(peerConnection, localStream, remoteStream, onClose);
        }
      });
    });
  }
};

export const hangUp = async (
  peerConnection,
  remoteVideo,
  localVideo,
  idCall
) => {
  const tracks = localVideo.current.srcObject.getTracks();
  tracks.forEach((track) => track.stop());

  if (remoteVideo.current.srcObject) {
    remoteVideo.current.srcObject.getTracks().forEach((track) => track.stop());
  }

  if (peerConnection) {
    peerConnection.close();
  }

  if (idCall) {
    const room = firestore.collection("calls").doc(idCall);
    const answerCandidates = await room.collection("answerCandidates").get();
    answerCandidates.forEach(async (candidate) => {
      await candidate.ref.delete();
    });
    const offerCandidates = await room.collection("offerCandidates").get();
    offerCandidates.forEach(async (candidate) => {
      await candidate.ref.delete();
    });
    await room.delete();
  }
};

const hangUpByOtherEnd = async (
  peerConnection,
  localStream,
  remoteStream,
  onClose
) => {
  console.log("hangUpByOtherEnd");
  const tracks = localStream.getTracks();
  tracks.forEach((track) => track.stop());

  if (remoteStream) {
    remoteStream.getTracks().forEach((track) => track.stop());
  }

  if (peerConnection) {
    peerConnection.close();
  }
  onClose();
};

function registerPeerConnectionListeners(peerConnection) {
  peerConnection.addEventListener("icegatheringstatechange", () => {
    console.log(
      `ICE gathering state changed: ${peerConnection.iceGatheringState}`
    );
  });

  peerConnection.addEventListener("connectionstatechange", () => {
    console.log(`Connection state change: ${peerConnection.connectionState}`);
  });

  peerConnection.addEventListener("signalingstatechange", () => {
    console.log(`Signaling state change: ${peerConnection.signalingState}`);
  });

  peerConnection.addEventListener("iceconnectionstatechange ", () => {
    console.log(
      `ICE connection state change: ${peerConnection.iceConnectionState}`
    );
  });
}
