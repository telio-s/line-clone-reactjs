import firebase from "../firebase";
const firestore = firebase.firestore();

// Call to someone
export const openMediaDevice = async (peerConnection) => {
  const remoteStream = new MediaStream();

  try {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    console.log("Got MediaStream:", localStream);

    console.log(localStream);
    console.log(remoteStream);
    return [localStream, remoteStream];
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
};

export const createCall = async (
  peerConnection,
  remoteStream,
  localStream,
  idCall
) => {
  console.log(idCall);
  registerPeerConnectionListeners(peerConnection);
  const callDoc = firestore
    .collection("calls")
    .doc("574433b4-2a1c-42bf-8342-191d0e92613c");
  const offerCandidates = callDoc.collection("offerCandidates");
  const answerCandidates = callDoc.collection("answerCandidates");
  // get tracks to localStream and push to peerConnection
  localStream.getTracks().forEach(async (track) => {
    await peerConnection.addTrack(track, localStream);
  });
  // listen to icecandidate event and add icecandidate (port,ip) to offerCandidates
  peerConnection.addEventListener("icecandidate", (event) => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  });
  console.log(peerConnection);
  peerConnection.addEventListener("track", (event) => {
    console.log("Got remote track:", event.streams[0]);
    event.streams[0].getTracks().forEach((track) => {
      console.log("Add a track to the remoteStream:", track);
      remoteStream.addTrack(track, remoteStream);
    });
  });

  console.log(remoteStream);

  // remoteVideo.current.srcObject = remoteStream;

  // remoteVideo.current.srcObject = remoteStream;
  // create offer (sdp: contains video/audio information and negotiate connection info)
  // setLocalDesCription with offer
  const offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription); // start generating icacandidates
  //then trigger icecandidate event (?-?)
  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };
  await callDoc.set({ offer });

  //detect change in calls document (listen for remote answer)
  callDoc.onSnapshot(async (snapshot) => {
    const data = snapshot.data();
    if (peerConnection.iceConnectionState !== "closed") {
      if (!peerConnection.currentRemoteDescription && data.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(answerDescription);
        //trigger track event
      }
    }
  });
  // when answered, add icecandidate to peerConnection
  answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        peerConnection.addIceCandidate(candidate);
        //trigger icecandidate event
      }
    });
  });
};

export const createAnswer = async (
  peerConnection,
  remoteStream,
  localStream,
  idCall
) => {
  console.log(idCall);
  const callDoc = firestore.collection("calls").doc(idCall);
  const callSnapshot = await callDoc.get();
  const offerCandidates = callDoc.collection("offerCandidates");
  const answerCandidates = callDoc.collection("answerCandidates");

  if (callSnapshot.exists) {
    registerPeerConnectionListeners(peerConnection);
    if (!localStream) {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    }
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
    // listen to icecandidate event and add icecandidate (port,ip) to offerCandidates
    peerConnection.addEventListener("icecandidate", (event) => {
      console.log("icecandidate event (ans)");
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
    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.addIceCandidate(candidate);
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
