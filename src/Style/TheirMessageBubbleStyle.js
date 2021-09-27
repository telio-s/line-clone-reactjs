import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  bubble: {
    backgroundColor: "#efefef",
    borderRadius: "20px",
    padding: "7px 14px 7px 14px",
    marginLeft: "10px",
    marginBottom: "10px",
  },
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  head: {
    display: "inline-block",
  },
  container: {
    padding: "0px",
    margin: "0px",
    width: "15vw",
    display: "flex",
    maxWidth: "200px",
  },
}));

export default useStyles;
