import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import useStyles from "../Style/TheirMessageBubbleStyle";

const TheirMessageBubble = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AccountCircle style={{ fontSize: "40px" }} />
      <Typography className={classes.bubble}>
        Deserunt ullamco qui nulla aliquip aliqua. Quis elit in ipsum sunt
        dolore duis. Nisi nisi duis et elit.
      </Typography>
    </div>
  );
};

export default TheirMessageBubble;
