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

const FormLoginEmail = (props) => {
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
            placeholder="Email address"
            fullWidth
            name="email"
            onChange={onChange}
          />
          <Divider />
          <InputBase
            className={classes.textField}
            placeholder="Password"
            fullWidth
            name="password"
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
            formState.email === "" || formState.password === "" ? true : false
          }
        >
          Log in
        </LineButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button className={classes.resetPassword}>Reset password</Button>
          </Grid>
        </Grid>
        {/* <Button
          className={classes.logInPhone}
          style={{ marginTop: "50px" }}
          onClick={() => {
            updateFormState(() => ({
              ...formState,
              formType: "confirmSignUp",
            }));
          }}
        >
          Log in with my smartphone {">"}
        </Button> */}
        <Button
          className={classes.logInPhone}
          onClick={() => {
            updateFormState(() => ({ ...formState, formType: "signUp" }));
          }}
        >
          Register {">"}
        </Button>
      </form>
    </Grid>
  );
};

export default FormLoginEmail;
