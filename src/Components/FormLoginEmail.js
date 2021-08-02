import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  InputBase,
  Divider,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { VisibilityOutlined } from "@material-ui/icons";
import LineButton from "../Style/LineButton";
import useStyles from "../Style/LoginStyle";

const FormLoginEmail = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <Grid item md={8} className={classes.root}>
      <Typography className={classes.logoText}>LINE</Typography>
      <form className={classes.form}>
        <div className={classes.boderText}>
          <InputBase
            className={classes.textField}
            placeholder="Email address"
            fullWidth
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Divider />
          <InputBase
            className={classes.textField}
            placeholder="Password"
            fullWidth
            type={show ? "text" : "password"}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            endAdornment={
              <InputAdornment position="end" variant="filled">
                <IconButton
                  disableRipple="true"
                  className={classes.eyeIcon}
                  onClick={() => {
                    !show ? setShow(true) : setShow(false);
                  }}
                >
                  {password !== "" ? <VisibilityOutlined /> : null}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <LineButton
          fullWidth
          disabled={email === "" || password === "" ? true : false}
        >
          Log in
        </LineButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button className={classes.resetPassword}>Reset password</Button>
          </Grid>
        </Grid>
        <Link to="/login-smartphone" className={classes.logInPhone}>
          Log in with my smartphone {">"}
        </Link>
      </form>
    </Grid>
  );
};

export default FormLoginEmail;
