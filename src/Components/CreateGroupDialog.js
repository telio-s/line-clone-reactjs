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
import GroupChatRoom from "./GroupChatRoom";

function CreateGroupDialog(props) {
  const hiddenCreateGroupBtn = useRef(null);
  const { open, onClose } = props;
  const { user, setChat, add, setAdd } = useContext(DashboardContext);
  const [selectedUser, setSelectedUser] = useState([]);
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  const classes = useStyles();

  function handleCreateGroup(e) {
    e.preventDefault();
    let usersId = [];
    selectedUser.map((user) => {
      usersId.push(user.friend.id);
    });
    usersId.push(user.id);
    console.log(usersId);
    const group = {
      isDirect: false,
      name,
    };
    console.log(group);
    async function createGroupAndAddUsers() {
      const data = await createNewGroup(group, usersId);
      setSelectedUser([]);
      setCheck(false);
      setName("");
      setChat(<GroupChatRoom group={data} />);
      setAdd(!add);
      onClose();
    }
    createGroupAndAddUsers();
    console.log("create group");
  }

  function handleClickSubmit() {
    console.log("click");
    hiddenCreateGroupBtn.current.click();
  }

  function handleSelectedUser(friend) {
    setSelectedUser([...selectedUser, friend]);
    console.log("selected");
  }
  function handleUnselectedUser(friend) {
    let _remain = selectedUser.filter((user) => {
      return user.friend.id != friend.friend.id;
    });
    setSelectedUser(_remain);
    console.log("unselected");
  }

  function handleClick(friend) {
    setCheck(!check);
    !check ? handleSelectedUser(friend) : handleUnselectedUser(friend);
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
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
                        <ListItem
                          key={index}
                          button
                          onClick={() => handleClick(friend)}
                        >
                          {friend.friend.username}
                          <Checkbox
                            checked={check}
                            size="small"
                            inputProps={{
                              "aria-label": "checkbox with small size",
                            }}
                            onClick={() => handleClick(friend)}
                          />
                        </ListItem>
                      ))
                    : null}
                </main>
              </Box>
            </Grid>
            <Grid items xs={6}>
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
