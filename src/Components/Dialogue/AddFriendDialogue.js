import React, { useState, useRef } from "react";
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
import { SearchOutlined } from "@material-ui/icons";
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
  const { user, onClose, isOpen, match, setChat, setFriendList } = props;
  const classes = useStyles();
  const [friend, setFriend] = useState(null);
  const [isFound, setIsFound] = useState(false);
  const [mes, setMes] = useState(null);
  const [added, setAdded] = useState(false);
  const [group, setGroup] = useState({});
  const [search, setSearch] = useState(null);

  function handleCloseDialogue() {
    // for clear all information
    setIsFound(false);
    setFriend(null);
    setMes(null);
    setGroup(null);
    onClose();
  }

  function enterFindFriend(e) {
    // console.log(e.target.value);
    if (e.keyCode === 13) {
      setFriend(null);
      findFriend(e.target.value);
    }
  }

  async function findFriend(username) {
    setAdded(false);
    setFriend(null);
    const data = await findFriendByUsername(username, user.groups.items, user);
    if (typeof data === "string") {
      const indexs = data.split("-");
      const indexG = indexs[2];
      const indexF = indexs[3];
      setIsFound(false);
      setFriend(user.groups.items[indexG].group.users.items[indexF].user);
      const [groupId, groupName, messages] = getGroupId(user, username);
      setGroup({ ...group, id: groupId, name: groupName, messages });
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
    const [success, group] = await addFriend(
      user.id,
      friend.id,
      user.username,
      friend.username
    );
    if (success) {
      setAdded(true);
      setGroup({ ...group, id: group.id, name: group.name });
      setFriendList((prevState) => [
        ...prevState,
        {
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
          id: "",
          group: {
            id: group.id,
            isDirect: group.isDirect,
            messages: group.messages,
            name: group.name,
            users: {
              items: [{ user: friend }],
            },
          },
        },
      ]);
    }
  }

  async function goToChat() {
    await setChatRoom(setChat, group, friend);
    // handleCloseDialogue();
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
              id="friendusername"
              onChange={(e) => setSearch(e.target.value)}
              className={classes.searchInput}
              placeholder="Enter your friend's ID"
              startAdornment={
                <InputAdornment position="start" variant="filled">
                  <IconButton
                    onClick={() => findFriend(search)}
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
                        goToChat();
                      }}
                    >
                      <Link
                        to={`${match.url}/${group.id}`}
                        style={{ textDecoration: "none", color: "white" }}
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
                      src={friend.profilePhoto && getImg(friend, "profile")}
                      style={{ width: "90px", height: "90px" }}
                    />
                    <h3>{friend.displayName}</h3>
                    <Typography style={{ color: "rgb(109,118,134)" }}>
                      This user is already your friend.
                    </Typography>
                    <LineButton
                      id="alreadyfriend-gotochat"
                      style={{ height: "30px" }}
                      disabled={false}
                      onClick={() => {
                        goToChat();
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
          <div>
            <Button
              id="close-addfriend-dialogue"
              onClick={() => handleCloseDialogue()}
            >
              Close Dialogue
            </Button>
            <Button id="search-friend" onClick={() => findFriend(search)}>
              Search
            </Button>
          </div>
        </Box>
      </div>
    </Dialog>
  );
}

export default AddFriendDialogue;
