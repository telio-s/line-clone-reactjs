import React from "react";
import { Button, Typography, Dialog, DialogTitle } from "@material-ui/core";
import useStyles from "../Style/DialogStyle";
const DialogAddFriends = (props) => {
  const { open } = props;
  const classes = useStyles;
  return (
    <Dialog
      open={open}
      //   PaperProps={{
      //     style: {
      //       backgroundColor: "#1f2b45",
      //       boxShadow: "none",
      //     },
      //   }}
    >
      <DialogTitle
        // className={classes.dialogtap}
        style={{ backgroundColor: "#1f2b45", color: "white" }}
      >
        Search for friends
      </DialogTitle>
    </Dialog>
  );
};

export default DialogAddFriends;
