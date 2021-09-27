import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  InputBase,
  Divider,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import { VisibilityOutlined } from "@material-ui/icons";
import LineButton from "../Style/line-button";
import useStyles from "../Style/authentication/authentication-form";

const FormRegister = (props) => {
  const { updateFormState, formState, onChange, onClick } = props;
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <Grid item md={8} className={classes.root}>
      <Typography className={classes.logoText}>LINE</Typography>
      <form className={classes.form}>
        <div className={classes.boderText}>
          <InputBase
            className={classes.textField}
            placeholder="Username"
            fullWidth
            name="username"
            onChange={onChange}
          />
          <Divider />
          <InputBase
            className={classes.textField}
            placeholder="Email address"
            fullWidth
            name="email"
            onChange={onChange}
          />
          <Divider />
          <InputBase
            className={classes.textField}
            placeholder="Password"
            name="password"
            fullWidth
            type={show ? "text" : "password"}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end" variant="filled">
                <IconButton
                  disableRipple={true}
                  className={classes.eyeIcon}
                  onClick={() => {
                    !show ? setShow(true) : setShow(false);
                  }}
                >
                  {formState.password !== "" ? <VisibilityOutlined /> : null}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <LineButton
          onClick={onClick}
          fullWidth
          disabled={
            formState.email === "" ||
            formState.password === "" ||
            formState.username === ""
              ? true
              : false
          }
        >
          Register
        </LineButton>
        <Button
          className={classes.logInPhone}
          style={{ marginTop: "30px" }}
          onClick={() => {
            updateFormState(() => ({ ...formState, formType: "signIn" }));
          }}
        >
          Log in with email {">"}
        </Button>
      </form>
    </Grid>
  );
};

export default FormRegister;
