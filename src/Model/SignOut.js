import React from "react";
import { Button } from "@material-ui/core";
import { Auth, Hub } from "aws-amplify";

const SignOut = () => {
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
