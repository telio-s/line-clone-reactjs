import React, { useState, useRef, useEffect } from "react";
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
import { openMediaDevice, createCall, hangUp } from "./webRTC";
import useStyle from "../Style/DialogCallStyle";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const DialogCaller = (props) => {
  const { open, onClose, idCall } = props;
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const classes = useStyle();
  const peerConnection = new RTCPeerConnection(servers);
  useEffect(() => {
    console.log("tongtong");
    getUsermedia();
    callConnection();

    return () => {
      console.log("clean up dialog caller");
    };
  }, []);

  const getUsermedia = async () => {
    if (open) {
      // Get remoteStream
      const [localStream, remoteStream] = await openMediaDevice(peerConnection);
      localVideo.current.srcObject = localStream;
      remoteVideo.current.srcObject = remoteStream;
    }
  };

  const callConnection = async (remoteStream, localStream) => {
    console.log("calling");
    await createCall(peerConnection, remoteVideo, localVideo, idCall);
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
      <DialogTitle>caller</DialogTitle>
      <DialogContent>
        {open ? (
          <>
            <video ref={localVideo} autoPlay />
            <div>caaller tong</div>
            <video ref={remoteVideo} autoPlay />
            <Button
              onClick={() =>
                hangUp(peerConnection, remoteVideo, localVideo, idCall)
              }
            >
              X
            </Button>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default DialogCaller;
