import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  bubble: {
    backgroundColor: "#efefef",
    borderRadius: "20px",
    maxWidth: "40%",
    padding: "10px",
    float: "left",
    marginLeft: "10px",
  },
  root: {
    marginLeft: "20px",
    maxWidth: "100%",
    display: "flex",
    marginTop: "10px",
  },
  head: {
    display: "inline-block",
  },
}));

export default useStyles;
