import React, { useState } from "react";
import LineButton from "../../Style/line-button";
import {
  Dialog,
  DialogTitle,
  Grid,
  Box,
  Typography,
  InputBase,
  InputAdornment,
  IconButton,
  Avatar,
  Button,
} from "@material-ui/core";
import { SearchOutlined, AccountCircle } from "@material-ui/icons";
import {
  addFriend,
  findFriendByUsername,
  getGroupId,
  setChatRoom,
} from "./../../utils/addfriends/utils";
import useStyles from "../../Style/add-friend/addfriend-dialogue";
import { Link } from "react-router-dom";
import { getImg } from "../../utils/profile/utils";

function AddFriendDialogue(props) {
  const { user, onClose, isOpen, match, chatRoom, setChat } = props;
  const classes = useStyles();
  const [friend, setFriend] = useState(null);
  const [isFound, setIsFound] = useState(false);
  const [mes, setMes] = useState(null);
  const [added, setAdded] = useState(false);
  const [group, setGroup] = useState({});

  function handleCloseDialogue() {
    // for clear all information
    setIsFound(false);
    setFriend(null);
    setMes(null);
    setGroup(null);
    onClose();
  }

  function enterFindFriend(e) {
    if (e.keyCode === 13) {
      setFriend(null);
      findFriend(e);
    }
  }

  async function findFriend(e) {
    setAdded(false);
    console.log(user);
    console.log(e.target.value);
    console.log(true & true & true);
    setFriend(null);
    const data = await findFriendByUsername(
      e.target.value,
      user.friends.items,
      user
    );
    console.log(data);
    if (typeof data === "string") {
      const index = data.split("-")[2];
      setIsFound(false);
      console.log(user.friends.items[index]);
      setFriend(user.friends.items[index]);
      const [groupId, groupName, messages] = getGroupId(user, e.target.value);
      setGroup({ ...group, id: groupId, name: groupName, messages });
      console.log(user.friends.items[index]);
      return;
    }
    if (!data) {
      setIsFound(false);
      setFriend(null);
      if (!mes) setMes("User not found.");
      return;
    }
    setIsFound(true);
    setFriend(data);
  }

  async function handleAddFriend() {
    const [success, groupID, groupName] = await addFriend(
      user.id,
      friend.id,
      user.username,
      friend.username
    );
    if (success) {
      setAdded(true);
      setGroup({ ...group, id: groupID, name: groupName });
      console.log("friend added groupid: ", groupID);
    }
  }

  function goToChat(type) {
    console.log("go to chat feed");
    if (type === "new-friend") {
      setChatRoom(setChat, group, friend.friend, type);
      handleCloseDialogue();
      return;
    }
    setChatRoom(setChat, group, friend.friend, type);
    handleCloseDialogue();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialogue}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.headText}>
        <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
          Search for friends
        </Typography>
      </DialogTitle>
      <div>
        <div style={{ background: "#eef2f5" }}>
          <Box style={{ padding: "0px 15px 15px 10px" }}>
            <Typography style={{ paddingTop: "10px" }}>LINE ID</Typography>
            <InputBase
              onKeyDown={(e) => enterFindFriend(e)}
              fullWidth
              className={classes.searchInput}
              placeholder="Search for chats and messages"
              startAdornment={
                <InputAdornment position="start" variant="filled">
                  <IconButton
                    onClick={(e) => findFriend(e)}
                    className={classes.iconBtn}
                  >
                    <SearchOutlined className={classes.iconSearch} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </div>
        <Box
          style={{
            background: "#ffffff",
            height: "250px",
            margin: "10px 15px 15px 10px",
          }}
        >
          {isFound ? (
            friend ? (
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: "40px" }}
              >
                <Avatar
                  src={friend.profilePhoto && getImg(friend, "profile")}
                  style={{ width: "90px", height: "90px" }}
                />
                <h3 style={{ margin: "10px" }}>{friend.displayName}</h3>
                {added ? (
                  group && (
                    <LineButton
                      style={{ height: "30px" }}
                      disabled={false}
                      onClick={() => {
                        goToChat("new-friend");
                      }}
                    >
                      <Link
                        to={`${match.url}/${group.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        chat
                      </Link>
                    </LineButton>
                  )
                ) : (
                  <LineButton
                    disabled={false}
                    onClick={() => handleAddFriend()}
                    style={{ height: "40px" }}
                  >
                    <Typography>Add</Typography>
                  </LineButton>
                )}
              </Grid>
            ) : null
          ) : (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: "40px" }}
            >
              {friend ? (
                group && (
                  <>
                    <Avatar
                      src={
                        friend.friend.profilePhoto &&
                        getImg(friend.friend, "profile")
                      }
                      style={{ width: "90px", height: "90px" }}
                    />
                    <h3>{friend.friend.displayName}</h3>
                    <Typography style={{ color: "rgb(109,118,134)" }}>
                      This user is already your friend.
                    </Typography>
                    <LineButton
                      style={{ height: "30px" }}
                      disabled={false}
                      onClick={() => {
                        goToChat("already-friend");
                      }}
                    >
                      <Link
                        to={`${match.url}/${group.id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        chat
                      </Link>
                    </LineButton>
                  </>
                )
              ) : (
                <Typography>{mes}</Typography>
              )}
            </Grid>
          )}
        </Box>
      </div>
    </Dialog>
  );
}

export default AddFriendDialogue;
