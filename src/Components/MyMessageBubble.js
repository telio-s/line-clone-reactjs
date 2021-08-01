import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import useStyles from "../Style/MyMessageBubbleStyle";

const MyMessageBubble = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.buble}>
        Laborum mollit elit ea commodo officia cupidatat in voluptate tempor.
        Eiusmod laboris fugiat in eu aliquip magna et excepteur esse consequat
        veniam in.
      </Typography>
    </div>
  );
};

export default MyMessageBubble;
