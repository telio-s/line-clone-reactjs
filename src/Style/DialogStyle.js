import React from "react";
import { makeStyles } from "@material-ui/styles";

const chatListWidth = 600;

const useStyles = makeStyles((theme) => ({
  root: {
    width: chatListWidth,
    overflowY: "scroll",
    overflow: "hidden",
  },
  dialogtap: {
    backgroundColor: "#1f2b45",
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
  headText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "20px",
    alignSelf: "center",
  },
  dialog: {
    width: "400px",
  },
}));

export default useStyles;
