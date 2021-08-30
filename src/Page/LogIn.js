import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import {
  Divider,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  InputBase,
  Button,
} from "@material-ui/core";
import qrImage from "../img/websiteQRCode_noFrame.png";
import { Auth, Hub } from "aws-amplify";

import FormRegister from "../Components/FormRegister";
import FormLoginEmail from "../Components/FormLoginEmail";
import FormConfirmRegister from "../Components/FormConfirmRegister";
import useStyles from "../Style/LoginStyle";

const initialFormState = {
  username: "",
  password: "",
  email: "",
  authCode: "",
  formType: "signIn",
};

const Login = () => {
  const history = useHistory();
  const classes = useStyles();

  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);
  // console.log(formState);

  useEffect(() => {
    checkUserCurrent();
    setAuthListener();
  }, []);

  const setAuthListener = () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          updateFormState(() => ({ ...formState, formType: "signIn" }));
          break;
        default:
          break;
      }
    });
  };

  const checkUserCurrent = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("user: ", user);
      updateUser(user);
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (err) {
      // updateUser(null)
    }
  };

  const onChange = (e) => {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  };

  const signUp = async () => {
    const { username, email, password } = formState;
    await Auth.signUp({ username, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  };
  const confirmSignUp = async () => {
    const { username, authCode } = formState;
    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({ ...formState, formType: "signIn" }));
  };
  const signIn = async () => {
    console.log("rree");
    const { email, password } = formState;
    await Auth.signIn(email, password);
    updateFormState(() => ({ ...formState, formType: "signedIn" }));
    history.push("/dashboard/chats", {
      params: updateFormState(() => ({ ...formState, formType: "signIn" })),
    });
  };

  const { formType } = formState;

  const routePage = () => {
    if (formType === "signIn") {
      return (
        <FormLoginEmail
          updateFormState={updateFormState}
          formState={formState}
          onChange={onChange}
          onClick={signIn}
        />
      );
    } else if (formType === "signedIn") {
      return (
        <div>
          <h1>Helo Tong</h1>
          <button
            onClick={() => {
              Auth.signOut();
            }}
          >
            sign out
          </button>
        </div>
      );
    } else if (formType === "signUp") {
      return (
        <FormRegister
          updateFormState={updateFormState}
          formState={formState}
          onChange={onChange}
          onClick={signUp}
        />
      );
    } else if (formType === "confirmSignUp") {
      return (
        <FormConfirmRegister
          updateFormState={updateFormState}
          formState={formState}
          onChange={onChange}
          onClick={confirmSignUp}
        />
      );
    }
  };

  return (
    <Router>
      <Grid className={classes.container}>
        {routePage()}

        <Divider orientation="vertical" flexItem />
        <Grid
          item
          md={4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
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
