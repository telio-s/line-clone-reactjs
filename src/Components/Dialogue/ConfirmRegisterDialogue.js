import { InputBase, Dialog, Button } from "@material-ui/core";
import React, { useState } from "react";
import {
  confirmRegister,
  handleOnKeyUpEvent,
} from "./../../utils/authentication/utils";
import useStyles from "../../styles/authentication/authentication-form";
import { useHistory } from "react-router-dom";

function ConfirmRegisterDialogue(props) {
  const classes = useStyles();
  const history = useHistory();
  const { onChange, form, setForm, show, setShow } = props;
  const [errMes, setErrMes] = useState(null);

  return (
    <Dialog open={show}>
      <div className={classes.dialog} style={{ width: "300px" }}>
        <InputBase
          className={classes.confirmInput}
          placeholder="Confirmation code"
          name="authCode"
          type="text"
          onChange={(e) => {
            setErrMes(null);
            onChange(e);
          }}
          onKeyUp={(e) =>
            form.authCode.length !== 6
              ? null
              : handleOnKeyUpEvent(e)
              ? confirmRegister(form, setForm, setErrMes, setShow, history)
              : null
          }
        />
      </div>
      {errMes && <h4>{errMes}</h4>}
      <Button
        className={classes.confirmBtn}
        disabled={form.authCode.length !== 6}
        onClick={() =>
          confirmRegister(form, setForm, setErrMes, setShow, history)
        }
      >
        Confirm
      </Button>
    </Dialog>
  );
}

export default ConfirmRegisterDialogue;
