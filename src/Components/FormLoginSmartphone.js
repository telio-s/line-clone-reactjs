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
import { VisibilityOutlined } from "@material-ui/icons";
import LineButton from "../Style/LineButton";
import useStyles from "../Style/LoginStyle";

const FormLoginSmartphone = () => {
  const classes = useStyles();
  const [phoneNum, setPhoneNum] = useState("");

  return (
    <Grid item md={8} className={classes.root}>
      <Typography className={classes.logoText}>LINE</Typography>
      <form className={classes.form}>
        <div className={classes.boderText}>
          <Divider />
          <InputBase
            className={classes.textField}
            placeholder="Phone number"
            fullWidth
            value={phoneNum}
            onChange={(event) => {
              setPhoneNum(event.target.value);
            }}
            // endAdornment={
            //   <InputAdornment position="end" variant="filled">
            //     <IconButton disableRipple="true" className={classes.eyeIcon}>
            //       <VisibilityOutlined />
            //     </IconButton>
            //   </InputAdornment>
            // }
          />
        </div>
        <LineButton fullWidth disabled={phoneNum === "" ? true : false}>
          Log in with smartphone
        </LineButton>
        <Link to="/login" className={classes.logInPhone}>
          Log in with email {">"}
        </Link>
      </form>
    </Grid>
  );
};

export default FormLoginSmartphone;
