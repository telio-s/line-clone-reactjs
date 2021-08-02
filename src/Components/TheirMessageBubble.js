import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import useStyles from "../Style/TheirMessageBubbleStyle";

const TheirMessageBubble = (props) => {
  const { message } = props;
  const classes = useStyles();
  console.log(message);

  return (
    <div className={classes.root}>
      <AccountCircle style={{ fontSize: "40px" }} />
      <Typography className={classes.bubble}>{message.message}</Typography>
    </div>
  );
};

export default TheirMessageBubble;
