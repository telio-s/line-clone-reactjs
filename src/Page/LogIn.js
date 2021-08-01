import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Divider, Grid, Typography } from "@material-ui/core";
import qrImage from "../img/websiteQRCode_noFrame.png";

import FormLoginEmail from "../Components/FormLoginEmail";
import FormLoginSmartphone from "../Components/FormLoginSmartphone";
import useStyles from "../Style/LoginStyle";

const Login = () => {
  const classes = useStyles();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [show, setShow] = useState(false);
  // const [phoneNum, setPhoneNum] = useState("");

  return (
    <Router>
      <Grid className={classes.container}>
        <Route path="/login" exact render={() => <>{<FormLoginEmail />}</>} />
        <Route path="/login-smartphone" component={FormLoginSmartphone} />

        <Divider orientation="vertical" flexItem />
        <Grid item md={4}>
          <img src={qrImage} width="250" height="250" />
          <Typography className={classes.textHead}>QR code login</Typography>
          <Typography className={classes.textDescript}>
            To scan your QR code, open LINE on your mobile device
            <br /> and tap the QR code icon in the search box.
          </Typography>
        </Grid>
      </Grid>
    </Router>
  );
};

export default Login;
