import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { checkCurrentUser } from "../utils/authentication/utils";
import LoginForm from "../Components/Form/LoginForm";
import RegisterForm from "../Components/Form/RegisterForm";
import ConfirmRegisterDialogue from "../Components/Dialogue/ConfirmRegisterDialogue";
import { useHistory } from "react-router-dom";
import useStyles from "../Style/authentication/authentication-form";
import { Hub } from "aws-amplify";

function Authentication() {
  const classes = useStyles();
  const history = useHistory();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    authCode: "",
    type: "Sign-in",
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    checkAuthenticatedUser();
    setAuthListener();
  }, []);

  const setAuthListener = () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          setForm(() => ({ ...form, type: "Sign-in" }));
          break;
        default:
          break;
      }
    });
  };

  async function checkAuthenticatedUser() {
    const user = await checkCurrentUser();
    if (user) {
      setForm({ ...form, type: "Signed-in" });
      history.push("/dashboard");
    }
  }

  function onChange(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function page() {
    if (form.type === "Sign-in") {
      return <LoginForm onChange={onChange} form={form} setForm={setForm} />;
    } else if (form.type === "Register") {
      return (
        <>
          <RegisterForm
            onChange={onChange}
            form={form}
            setForm={setForm}
            setShow={setShow}
          />
          <ConfirmRegisterDialogue
            onChange={onChange}
            form={form}
            setForm={setForm}
            show={show}
            setShow={setShow}
          />
        </>
      );
    }
  }

  return (
    <>
      {form.type !== "Signed-in" && (
        <Grid className={classes.container}>{page()}</Grid>
      )}
    </>
  );
}

export default Authentication;
