import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  InputAdornment,
  InputBase,
} from "@material-ui/core";
import { DirectChatRoomContext } from "../Components/DirectChatRoom";
import { openMediaDevice, createAnswer, hangUp } from "./webRTC";
import useStyle from "../Style/DialogCallStyle";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const DialogCallReceiver = (props) => {
  const { open, onClose, idCall } = props;
  const [getCall, setGetCall] = useState(false);
  // const { idCall } = useContext(DirectChatRoomContext);

  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const classes = useStyle();
  const peerConnection = new RTCPeerConnection(servers);

  useEffect(() => {
    console.log("tongtong");
    getUsermedia();
    // callConnection();

    return () => {
      console.log("clean up dialog caller");
    };
  }, []);

  // useEffect(() => {
  //   console.log(getCall);
  // }, [getCall]);

  const getUsermedia = async () => {
    if (open) {
      // Get remoteStream
      const [localStream, remoteStream] = await openMediaDevice(peerConnection);
      localVideo.current.srcObject = localStream;
      remoteVideo.current.srcObject = remoteStream;
    }
  };

  const answerConnection = async () => {
    console.log("getCall");
    createAnswer(
      peerConnection,
      //remote stream
      remoteVideo.current.srcObject,
      idCall
    );
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
      <DialogTitle>receiver</DialogTitle>
      <DialogContent>
        <Button onClick={answerConnection}>answer</Button>

        <>
          <video ref={localVideo} autoPlay />
          <div>receiver tong</div>
          <video ref={remoteVideo} autoPlay />
          <Button
            onClick={() =>
              hangUp(peerConnection, remoteVideo, localVideo, idCall)
            }
          >
            X
          </Button>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCallReceiver;
