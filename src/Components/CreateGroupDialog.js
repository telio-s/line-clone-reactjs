import {
  Avatar,
  Button,
  Dialog,
  Divider,
  TextField,
  ListItem,
  Grid,
  Paper,
  Box,
  Checkbox,
} from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createNewGroup } from "../api/mutations";
import { DashboardContext } from "../Page/Dashboard";
import useStyles from "../Style/ChatRoomListStyle";
import Friend from "./Friend";
import GroupChatRoom from "./GroupChatRoom";

function CreateGroupDialog(props) {
  const hiddenCreateGroupBtn = useRef(null);
  const { open, onClose } = props;
  const { user, setChat } = useContext(DashboardContext);
  const [selectedUser, setSelectedUser] = useState([]);
  const [name, setName] = useState("");
  const classes = useStyles();

  function handleOnClose() {
    setSelectedUser([]);
    setName("");
    onClose();
  }

  function handleCreateGroup(e) {
    e.preventDefault();
    let usersId = [];
    selectedUser.map((user) => {
      usersId.push(user.friend.id);
    });
    usersId.push(user.id);
    const group = {
      isDirect: false,
      name,
    };
    async function createGroupAndAddUsers() {
      const data = await createNewGroup(group, usersId);
      setSelectedUser([]);
      setName("");
      setChat(<GroupChatRoom group={data} />);
      onClose();
    }
    createGroupAndAddUsers();
  }

  function handleClickSubmit() {
    hiddenCreateGroupBtn.current.click();
  }

  function handleSelectedUser(friend) {
    setSelectedUser([...selectedUser, friend]);
  }
  function handleUnselectedUser(friend) {
    let _remain = selectedUser.filter((user) => {
      return user.friend.id != friend.friend.id;
    });
    setSelectedUser(_remain);
  }

  function handleClick(friend, add) {
    !add ? handleSelectedUser(friend) : handleUnselectedUser(friend);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleOnClose}>
        <h1>CreateGroup</h1>
        <div style={{ width: "500px" }}>
          <form onSubmit={handleCreateGroup}>
            <div style={{ display: "flex" }}>
              <Avatar></Avatar>
              <TextField
                id="outlined-basic"
                placeholder="Group Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* hide this button and trigger using ref instead */}
              <Button
                type="submit"
                ref={hiddenCreateGroupBtn}
                style={{ display: "none" }}
              ></Button>
            </div>
          </form>
          <Divider />
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
          >
            <Grid item xs={6}>
              <Box borderRight={1} style={{ borderColor: "black" }}>
                <TextField placeholder="Search by display name" />
                <main className={classes.main}>
                  {user
                    ? user.friends.items.map((friend, index) => (
                        <Friend
                          key={index}
                          friend={friend}
                          handleSelection={handleClick}
                        />
                      ))
                    : null}
                </main>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                {selectedUser.length
                  ? selectedUser.map((user) => (
                      <Button>{user.friend.username}</Button>
                    ))
                  : null}
              </Paper>
            </Grid>
          </Grid>
          <div>
            <Button
              style={{ backgroundColor: "yellow" }}
              onClick={handleClickSubmit}
            >
              create here
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateGroupDialog;
