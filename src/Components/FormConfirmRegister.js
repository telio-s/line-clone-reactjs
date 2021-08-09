import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  InputBase,
  Divider,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import LineButton from "../Style/LineButton";
import useStyles from "../Style/LoginStyle";

const FormConfirmRegister = (props) => {
  const { updateFormState, formState, onChange, onClick } = props;
  const classes = useStyles();

  return (
    <Grid item md={8} className={classes.root}>
      <Typography className={classes.logoText}>LINE</Typography>
      <form className={classes.form}>
        <div className={classes.boderText}>
          <Divider />
          <InputBase
            className={classes.textField}
            placeholder="Confirmation code"
            fullWidth
            name="authCode"
            onChange={onChange}
          />
        </div>
        <LineButton
          onClick={onClick}
          fullWidth
          disabled={formState.authCode === "" ? true : false}
        >
          Confirm register
        </LineButton>
        {/* <Link
          to="/login"
          className={classes.logInPhone}
          onClick={() => {
            updateFormState(() => ({ ...formState, formType: "signIn" }));
          }}
        >
          Log in with email {">"}
        </Link> */}
      </form>
    </Grid>
  );
};

export default FormConfirmRegister;
