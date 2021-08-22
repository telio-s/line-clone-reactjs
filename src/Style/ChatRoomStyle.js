import React from "react";
import { makeStyles } from "@material-ui/styles";

const drawerChatListWidth = 680;
const appbarStack = 278;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
    width: `calc(100vw - ${drawerChatListWidth}px)`,
    height: `calc(98vh - 64px)`,
  },
  appbar: {
    backgroundColor: "#ffffff",
    padding: "15px 0px 15px 0px",
  },
  nameChat: {
    fontWeight: "600",
    color: "#000000",
    fontSize: "20px",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  iconSection: {
    fontSize: "30px",
    color: "#050505",
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  chatArea: {
    overflowY: "scroll",
    height: `calc(100vh - ${appbarStack}px)`,
    backgroundColor: "#ffffff",
    overflow: "auto",
  },
  textArea: {
    height: "120px",
    backgroundColor: "#ffffff",
    padding: "0px 0px 0px 20px",
    position: "fixed",
    // bottom: 0,
  },
  iconButtTextArea: {
    margin: "0px 10px 0px 0px",
    height: "40px",
    display: "flex",
  },
  chatfeed: {
    overflowY: "scroll",
    overflow: "hidden",
    height: `calc(100vh - 278px)`,
  },
}));

export default useStyles;
