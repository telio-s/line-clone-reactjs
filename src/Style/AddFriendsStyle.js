import React from "react";
import { makeStyles } from "@material-ui/styles";

const chatListWidth = 600;

const useStyles = makeStyles((theme) => ({
  root: {
    width: chatListWidth,
    overflowY: "scroll",
    overflow: "hidden",
    height: `calc(100vh - 64px)`,
    // backgroundColor: "#000000"
  },
  icon: {
    fontSize: "40px",
    backgroundSize: "60px 60px",
    backgroundColor: "#efefef",
    borderRadius: "50%",
    padding: "10px 10px 10px 10px",
  },
  feature: {
    width: chatListWidth,
    height: 90,
    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
    "&:focus": {
      backgroundColor: "#f3f3f3",
    },
    textTransform: "capitalize !important",
    // padding: "10px 20px 10px 10px",
    display: "flex",
  },
}));

export default useStyles;
