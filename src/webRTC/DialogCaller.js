import React, { useState, useRef } from "react";
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
import { openMediaDevice } from "./webRTC";
import useStyle from "../Style/DialogCallStyle";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const DialogCaller = async (props) => {
  //   const { open, onClose } = props;
  //   console.log(open);
  const localVideo = useRef(null);
  const classes = useStyle();

  //   let remoteStream;
  //   if (open) {
  //     const peerConnection = new RTCPeerConnection(servers);
  //     // Get remoteStream
  //     // remoteStream = await openMediaDevice(peerConnection);
  //     // localVideo.current.srcObject = await remoteStream;
  //   }

  return (
    <div>
      {/* <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
      <DialogTitle>caller</DialogTitle>
      <DialogContent>
        <video ref={localVideo} autoplay />
        <Button>X</Button>
      </DialogContent>
    </Dialog> */}
    </div>
  );
};

export default DialogCaller;
