import React, { useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function MoreMenu(props) {
  const { onClose, anchorEl } = props;
  const history = useHistory();

  useEffect(() => {
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
    setAuthListener();

    return () => {};
  }, []);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        id="simple-menu"
        keepMounted
      >
        <MenuItem
          onClick={() => Auth.signOut()}
          id="logout"
          style={{
            fontSize: "15px",
            height: "20px",
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
}

export default MoreMenu;
