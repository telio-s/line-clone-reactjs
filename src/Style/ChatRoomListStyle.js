import React from "react";
import { makeStyles } from "@material-ui/styles";

const chatListWidth = 600;

const useStyles = makeStyles((theme) => ({
  root: {
    width: chatListWidth,
    overflowX: "scroll",
  },
  appbar: {
    backgroundColor: "#ffffff",
    marginBottom: "10px",
  },
  searchInput: {
    padding: "15px",
    backgroundColor: "#f3f3f3",
    borderRadius: "10px",
    marginTop: "20px",
  },
  iconSearch: {
    paddingBottom: "10px",
    color: "#b7b7b7",
  },
  chatRoom: {
    width: chatListWidth,
    height: 100,
    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
    "&:focus": {
      backgroundColor: "#f3f3f3",
    },
    textTransform: "capitalize !important",
    padding: "10px 20px 10px 20px",
  },
  chatDesc: {
    textAlign: "left",
    padding: "10px",
  },
  nameChat: {
    fontWeight: "600",
  },
  timeChat: {
    color: "#b7b7b7",
    alignSelf: "stretch",
    paddingTop: "10px",
  },
  multiLineEllipsis: {
    color: "#777777",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
}));

export default useStyles;
