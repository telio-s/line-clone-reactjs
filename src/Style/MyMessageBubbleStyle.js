import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "inline-block",
    alignItems: "flex-end",
  },
  buble: {
    backgroundColor: "#c3f69d",
    borderRadius: "20px",
    maxWidth: "40%",
    padding: "10px",
    float: "right",
    marginRight: "20px",
  },
}));

export default useStyles;
