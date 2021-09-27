import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "inline-block",
    alignItems: "flex-end",
  },
  bubble: {
    backgroundColor: "#c3f69d",
    borderRadius: "20px",
    maxWidth: "40%",
    padding: "10px",
    float: "right",
    marginRight: "20px",
  },
  pictures: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderColor: "whitesmoke",
    borderRadius: "2px",
    borderColor: "whitesmoke",
    margin: "1px",
    marginTop: "5px",
    backgroundPosition: "center",
  },
}));

export default useStyles;
