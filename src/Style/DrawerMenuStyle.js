import React from "react";
import { makeStyles } from "@material-ui/styles";

const drawerWidth = "5%";
const appbarHeight = 64;

const useStyles = makeStyles((theme) => ({
  drawer: {},
  drawerPaper: {
    width: drawerWidth,
    background: "rgb(32,42,67)",
  },
  iconMtDrawer: {
    fontSize: "130%",
  },
  iconAweDrawer: {
    fontSize: "110%",
  },
  drawerIconBottom: {
    marginTop: "auto",
    alignSelf: "center",
  },
  iconButton: {
    color: "#4e5870",
    "&:focus": {
      color: "#ffffff",
      backgroundColor: "transparent",
    },
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "transparent",
    },
    marginBottom: "5px",
  },
  notiBox: {
    width: "20px",
    height: "20px",
    backgroundColor: "#ea4851",
    borderRadius: "50%",
    justifyContent: "center",
    display: "flex",
    margin: "auto",
    position: "absolute",
    left: "30px",
    top: "10px",
  },
  noti: {
    color: "#ffffff",
    margin: "auto",
    fontWeight: "bold",
    fontSize: "12px",
  },
}));

export default useStyles;
