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
import { openMediaDevice, createCall, hangUp } from "./webRTC";
import { DirectChatRoomContext } from "../Components/DirectChatRoom";
import useStyle from "../Style/DialogCallStyle";

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
  const { open, onClose, idCall } = props;
  // const { idCall } = useContext(DirectChatRoomContext);
  console.log(idCall);
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const classes = useStyle();
  const peerConnection = new RTCPeerConnection(servers);

  useEffect(() => {
    console.log("tongtong");

    getUsermedia();

    return () => {
      console.log("clean up dialog caller");
    };
  }, []);

  // useEffect(() => {
  //   getUsermedia();
  // }, []);

  const getUsermedia = async () => {
    if (open) {
      // Get remoteStream
      const [localStream, remoteStream] = await openMediaDevice(peerConnection);
      localVideo.current.srcObject = localStream;
      remoteVideo.current.srcObject = remoteStream;
      console.log(idCall);
      console.log(remoteStream);
      console.log(localStream);
      createCall(peerConnection, remoteStream, localStream, idCall);
      console.log(remoteStream);
      console.log(localStream);
    }
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
