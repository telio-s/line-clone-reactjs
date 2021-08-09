import {
  Box,
  Dialog,
  Grid,
  Divider,
  Paper,
  TextField,
  Button,
  ListItem,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { createUsersGroup } from "../api/mutations";
import { DashboardContext } from "../Page/Dashboard";
import Friend from "./Friend";
import { getTheGroup } from "./../api/queries";

function AddFriendsToGroup(props) {
  const { open, onClose, group, members, setMembers, alreadyIn, setAlreadyIn } =
    props;
  const [search, setSearch] = useState("");
  const { user } = useContext(DashboardContext);
  const [selected, setSelectedUser] = useState([]);
  //   const [pending, setPending] = useState([]);

  function handleOnClose() {
    setSelectedUser([]);
    onClose();
  }

  function handleSelectedUser(friend) {
    setSelectedUser([...selected, friend]);
  }

  function handleUnselectedUser(friend) {
    let _remain = selected.filter((s) => {
      return s.friend.id !== friend.friend.id;
    });
    setSelectedUser(_remain);
  }

  function handleSelection(friend, add) {
    !add ? handleSelectedUser(friend) : handleUnselectedUser(friend);
  }

  function handleSubmit() {
    async function createUserToGroup(users) {
      const data = await createUsersGroup(users, group.id);
      console.log(data);
    }
    async function getGroup() {
      const data = await getTheGroup(group.id);
      setMembers(data.users.items);
    }
    let users = [];
    selected.map((friend) => {
      users.push(friend.friend.id);
      //   setPending([...pending, friend]);
      setAlreadyIn([...alreadyIn, friend.friend.id]);
    });
    createUserToGroup(users);
    getGroup();
    handleOnClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleOnClose}>
        <div style={{ width: "500px" }}>
          <h1>Add Friends to Chat</h1>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
          >
            <Grid item xs={6}>
              <Box borderRight={1} style={{ borderColor: "black" }}>
                <TextField
                  id="outlined-basic"
                  placeholder="Search by display name"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Divider />
                {user.friends.items.map((friend, index) =>
                  alreadyIn.includes(friend.friend.id) ? null : (
                    <Friend
                      key={index}
                      friend={friend}
                      handleSelection={handleSelection}
                    />
                  )
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                {selected.length
                  ? selected.map((user, index) => (
                      <Button key={index}>{user.friend.username}</Button>
                    ))
                  : "No friends selected"}
              </Paper>
            </Grid>
          </Grid>
          <div>
            <Button
              style={{ backgroundColor: "yellowgreen" }}
              onClick={handleSubmit}
            >
              add
            </Button>
            <Button
              style={{ backgroundColor: "whitesmoke" }}
              onClick={handleOnClose}
            >
              cancle
            </Button>
          </div>
          <Divider />
          <h4>Members</h4>
          {members.map((user, index) => (
            <ListItem key={index}>{user.user.username}</ListItem>
          ))}
        </div>
      </Dialog>
    </div>
  );
}

export default AddFriendsToGroup;
