import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  bubble: {
    backgroundColor: "#c3f69d",
    borderRadius: "20px",
    padding: "7px 14px 7px 14px",
    marginRight: "10px",
    marginBottom: "10px",
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
  container: {
    padding: "0px",
    margin: "0px",
    width: "15vw",
    display: "flex",
    maxWidth: "200px",
  },
}));

export default useStyles;
