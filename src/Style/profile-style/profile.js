import { makeStyles } from "@material-ui/core";

const chatListWidth = "35%";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: `calc(100vw - ${80}px)`,
    width: chatListWidth,
    overflowY: "auto",
    // overflow: "hidden",
    height: `calc(99vh)`,
    marginLeft: "5%",
    minWidth: "400px",
  },
  imgSize: {
    width: "50px",
    height: "50px",
  },
  profileContainer: {
    paddingTop: "5px",
    marginBottom: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  friendList: {
    width: "100%",
    height: 70,
    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
    "&:focus": {
      backgroundColor: "#f3f3f3",
    },
    textTransform: "capitalize !important",
    padding: "10px 20px 10px 15px",
    justifyContent: "flex-start",
  },
  listBox: {
    textAlign: "left",
    padding: "10px",
    width: "70%",
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
