import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "../../../styles/MyMessageBubbleStyle";

const MyMessageBubble = (props) => {
  const { message } = props;
  const classes = useStyles();
  // console.log(message);
  return (
    <div className={classes.root}>
      <Typography className={classes.buble}>{message.message}</Typography>
    </div>
  );
};

export default MyMessageBubble;
