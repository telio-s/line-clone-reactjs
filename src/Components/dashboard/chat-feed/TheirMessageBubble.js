import React from "react";
import { Typography, Dialog } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import useStyles from "../../../styles/TheirMessageBubbleStyle";

const TheirMessageBubble = (props) => {
  const { message } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AccountCircle style={{ fontSize: "40px" }} />
      <Typography className={classes.bubble}>{message.message}</Typography>
    </div>
  );
};

export default TheirMessageBubble;
