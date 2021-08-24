import React, { useState } from "react";
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

const DialogCallReceiver = (props) => {
  const { open, onClose } = props;
  const classes = useStyle();

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
      <DialogTitle>receiver</DialogTitle>
      <DialogContent>
        <video id="localVideo" autoplay playsinline controls="false" />
        <Button>X</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCallReceiver;
