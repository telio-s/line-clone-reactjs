import React from "react";
import { makeStyles } from "@material-ui/styles";

const drawerWidth = 80;
const appbarHeight = 64;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  appbar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: "#ffffff",
    width: "100%",
    marginLeft: drawerWidth,
  },
  chatSection: {
    margin: "0px 10px 0px 0px",
    color: "#b7b7b7",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "20px",
    textTransform: "capitalize !important",
    "&:focus": {
      color: "#000000",
      backgroundColor: "transparent",
    },
    "&:hover": {
      color: "#000000",
      backgroundColor: "transparent",
    },
  },
  drawer: {},
  drawerPaper: {
    width: drawerWidth,
    background: "#1f2b45",
  },
  iconMtDrawer: {
    color: "#4e5870",
    fontSize: "40px",
    "&:focus": {
      color: "#ffffff",
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  iconAweDrawer: {
    color: "#4e5870",
    fontSize: "30px",
    "&:focus": {
      color: "#ffffff",
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIconBottom: {
    marginTop: "auto",
  },
  mainDrawerRoot: {
    display: "flex",
  },
  rootmain: {
    display: "flex",
    width: `100%`,
    height: `100vh`,
  },
  iconButton: {
    "&:hover": {
      color: "transparent",
      backgroundColor: "transparent",
    },
    marginBottom: "5px",
  },
  main: {
    width: `calc(100% - ${drawerWidth}px)`,
    height: `100vh`,
  },
}));

export default useStyles;
