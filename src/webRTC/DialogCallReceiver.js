import React, { useRef, useEffect, useState } from "react";
import { Dialog } from "@material-ui/core";
import { openMediaDevice, createAnswer, hangUp } from "./webRTC";
import useStyle from "../Style/DialogCallStyle";
import { IconButton } from "@material-ui/core";
import { CallEndRounded, CallRounded } from "@material-ui/icons";
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

const DialogCallReceiver = (props) => {
  const { open, onClose, idCall, myUser, myFriend } = props;

  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const classes = useStyle();
  const peerConnection = new RTCPeerConnection(servers);
  const [isReceive, setIsRecieve] = useState(false);

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
      return;
    }
  };

  const answerConnection = async () => {
    console.log("call create answer");
    setIsRecieve(true);
    createAnswer(
      peerConnection,
      remoteVideo.current.srcObject, //remote stream
      localVideo.current.srcObject, //local stream
      idCall,
      onClose
    );
  };

  return (
    <Dialog open={open}>
      <div style={{ width: "300px", height: "500px" }}>
        <img
          src={mockProfile}
          style={{ objectFit: "cover", width: "300px", height: "300px" }}
        ></img>
        <audio ref={localVideo} autoPlay />
        <audio ref={remoteVideo} autoPlay />
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <IconButton
            className={classes.iconButton}
            style={{
              backgroundColor: "rgb(255,54,60)",
              color: "whitesmoke",
              marginRight: isReceive ? "0px" : "40px",
            }}
            onClick={() => {
              hangUp(peerConnection, remoteVideo, localVideo, idCall);
              onClose();
            }}
          >
            <CallEndRounded fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => answerConnection()}
            className={classes.iconButton}
            style={{
              display: isReceive ? "none" : "",
              backgroundColor: "rgb(0,200,49)",
              color: "whitesmoke",
            }}
          >
            <CallRounded fontSize="large" />
          </IconButton>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogCallReceiver;
