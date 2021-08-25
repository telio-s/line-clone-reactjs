import React from "react";
import { makeStyles } from "@material-ui/styles";

const chatListWidth = 600;

const useStyles = makeStyles((theme) => ({
  root: {
    width: chatListWidth,
    overflowY: "scroll",
    overflow: "hidden",
  },

  dialog: {
    width: "700px",
  },
}));

export default useStyles;
