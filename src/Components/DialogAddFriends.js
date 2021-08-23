import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  InputAdornment,
  InputBase,
} from "@material-ui/core";
import { SearchOutlined, AccountCircle } from "@material-ui/icons";
import useStyles from "../Style/DialogStyle";
import { Auth, Hub } from "aws-amplify";
import { listUsersByUsername } from "./graphql/queriesapi";
import {
  createUserFriendsApi,
  createGroupApi,
  createUserGroupApi,
} from "./graphql/mutationapi";
import LineButton from "../Style/LineButton";

const DialogAddFriends = (props) => {
  const { open, onClose } = props;
  const classes = useStyles;
  const [objFine, setObjFind] = useState(null);
  const [press, setPress] = useState(false);
  const [myUsername, setMyUsername] = useState(null);
  const [myUserInfo, setMyUserInfo] = useState(null);
  const [button, setButton] = useState(null);

  useEffect(() => {
    checkUserCurrent();

    return () => {
      console.log("clean up");
    };
  }, []);

  const checkUserCurrent = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setMyUsername(user.username);
      console.log("user: ", user);
    } catch (err) {
      // updateUser(null)
    }
  };

  const keyPress = async (e) => {
    if (e.keyCode === 13) {
      setPress(true);
      const data = await listUsersByUsername(e.target.value);
      if (data) {
        setObjFind(data);

        // fetch my account info for check
        const myUser = await listUsersByUsername(myUsername);
        setMyUserInfo(myUser);
        const arrFriends = [];
        for (let i = 0; i < myUser.friends.items.length; i++) {
          arrFriends.push(myUser.friends.items[i].friend.username);
          console.log(myUser.friends.items[i].friend.username);
        }

        // check objFind is not me, if is not then set null button
        if (myUser.username == data.username) {
          setButton(true);
        }
        // check objFind is not my friend, if is not then set null button
        else if (arrFriends.includes(e.target.value)) {
          setButton(true);
        } else {
          setButton(false);
        }
      } else {
        setObjFind(null);
      }
    }
  };

  const clickAdd = async () => {
    console.log(myUserInfo); // my account
    console.log(objFine); // friend account
    // check objFind not both condition, then set have button for add
    await createUserFriendsApi(myUserInfo.id, objFine.id);
    await createUserFriendsApi(objFine.id, myUserInfo.id);
    const group = await createGroupApi(
      `${myUserInfo.username}${objFine.username}`,
      true
    );
    await createUserGroupApi(group.id, myUserInfo.id);
    await createUserGroupApi(group.id, objFine.id);
    setButton(true);
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
      <DialogTitle
        // className={classes.dialogtap}
        style={{ backgroundColor: "#1f2b45", color: "white" }}
      >
        <Typography
          style={{
            color: "#ffffff",
            fontWeight: "500",
            fontSize: "20px",
          }}
        >
          Search for friends
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box style={{ background: "#eef2f5" }}>
          <Typography>LINE ID</Typography>
          <InputBase
            onKeyDown={keyPress}
            fullWidth
            className={classes.searchInput}
            placeholder="Search for chats and messages"
            startAdornment={
              <InputAdornment position="start" variant="filled">
                <SearchOutlined className={classes.iconSearch} />
              </InputAdornment>
            }
          />
        </Box>
        <Box style={{ background: "#ffffff", height: "400px" }}>
          {press ? (
            objFine ? (
              <>
                <AccountCircle />
                <Typography>{objFine.username}</Typography>
                <LineButton disabled={button} onClick={clickAdd}>
                  Add
                </LineButton>
              </>
            ) : (
              <Typography>User not found</Typography>
            )
          ) : null}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddFriends;
