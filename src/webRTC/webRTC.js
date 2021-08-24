// Call to someone
export const openMediaDevice = async (peerConnection) => {
  const remoteStream = new MediaStream();

  const openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
  };

  try {
    const localStream = await openMediaDevices({ video: true, audio: true });
    console.log("Got MediaStream:", localStream);

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.addEventListener("track", async (event) => {
      remoteStream.addTrack(event.track, remoteStream);
    });
    return remoteStream;
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
};

export const createCall = (e) => {};
