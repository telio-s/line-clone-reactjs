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
    backgroundColor: "white",
    borderRadius: "10px",
    marginTop: "10px",
    height: "40px",
  },
  iconSearch: {
    color: "#b7b7b7",
    fontSize: "20px",
  },
  headText: {
    color: "#ffffff",
    backgroundColor: "#1f2b45",
    color: "white",
    height: "20px",
  },
  dialog: {
    width: "400px",
  },
  iconBtn: {
    width: "30px",
    height: "30px",
    marginBottom: "15px",
  },
  chatBtn: {
    backgroundColor: "#07b53b",
    "&:hover": {
      backgroundColor: "#07b53b",
    },
    "&:disabled": {
      backgroundColor: "#bababa",
    },
    textTransform: "capitalize !important",
    marginTop: "15px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
}));

export default useStyles;
