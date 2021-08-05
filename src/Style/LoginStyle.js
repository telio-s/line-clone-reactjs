import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: "100vh",
  },
  root: {
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  form: {
    minWidth: "400px",
    maxWidth: "600px",
  },
  boderText: {
    border: "1px solid #dedede",
    borderRadius: "5px",
  },
  textField: {
    padding: "10px 10px 10px 20px",
  },
  resetPassword: {
    textTransform: "capitalize !important",
    color: "#616161",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logInPhone: {
    textDecoration: "none",
    marginTop: "10px",
    display: "flex",
    textTransform: "capitalize !important",
    color: "#000000",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logoText: {
    fontSize: "50px",
    fontWeight: "700",
    color: "#07b53b",
    marginBottom: "30px",
  },
  textHead: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
  },
  textDescript: {
    color: "#858585",
    margin: "20px 40px 10px 40px",
    display: "flex",
    alignItems: "center",

    justifyContent: "center",
  },
  eyeIcon: {
    color: "#bababa",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#858585",
    },
    "&:active": {
      color: "#69b37d",
      backgroundColor: "transparent",
    },
  },
}));

export default useStyles;
