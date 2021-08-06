import React, { useEffect } from "react";

import { Button } from "@material-ui/core";
import { Auth, Hub } from "aws-amplify";
import { useHistory } from "react-router";

const SignOut = (props) => {
  const history = useHistory();
  useEffect(() => {
    setAuthListener();
  }, []);

  const setAuthListener = () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          history.push("/");
          break;
        default:
          break;
      }
    });
  };
  return (
    <Button
      onClick={() => {
        Auth.signOut();
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
