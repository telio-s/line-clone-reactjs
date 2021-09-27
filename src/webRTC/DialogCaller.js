import React, { useRef, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { openMediaDevice, createCall, hangUp } from "./webRTC";
import useStyle from "../Style/DialogCallStyle";
import CallEndRoundedIcon from "@material-ui/icons/CallEndRounded";
import { IconButton } from "@material-ui/core";
import mockProfile from "./../in-the-mood-for-love-1.jpeg";

const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun.services.mozilla.com",
      ],
    },
  ],
};

const DialogCaller = (props) => {
  const { open, onClose, idCall, myUser, myFriend } = props;

  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const classes = useStyle();
  const peerConnection = new RTCPeerConnection(servers);

  useEffect(() => {
    getUsermedia();

    return () => {
      console.log("clean up dialog caller");
    };
  }, []);

  const getUsermedia = async () => {
    if (open) {
      // Get remoteStream
      const [localStream, remoteStream] = await openMediaDevice();
      localVideo.current.srcObject = localStream;
      remoteVideo.current.srcObject = remoteStream;

      createCall(peerConnection, remoteStream, localStream, idCall, onClose);
      return;
    }
  };

  return (
    <Dialog open={open}>
      <div style={{ width: "300px", height: "500px" }}>
        {open ? (
          <>
            {/* friend profile pic */}
            <img
              src={mockProfile}
              style={{ objectFit: "cover", width: "300px", height: "300px" }}
            ></img>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h1>{myFriend.username}</h1>
            </div>
            {console.log(localVideo)}
            <video ref={localVideo} autoPlay />
            <video ref={remoteVideo} autoPlay />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                style={{
                  backgroundColor: "rgb(255,54,60)",
                  color: "whitesmoke",
                }}
                className={classes.iconButton}
                onClick={() => {
                  hangUp(peerConnection, remoteVideo, localVideo, idCall);
                  onClose();
                }}
              >
                <CallEndRoundedIcon fontSize="large" />
              </IconButton>
            </div>
          </>
        ) : null}
      </div>
    </Dialog>
  );
};

export default DialogCaller;
