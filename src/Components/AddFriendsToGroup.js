import {
  Box,
  Dialog,
  Grid,
  Divider,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { createNewGroup, createUsersGroup } from "../api/mutations";
import { getTheGroup } from "../api/queries";
import { DashboardContext } from "../Page/Dashboard";
import Friend from "./Friend";
import GroupChatRoom from "./GroupChatRoom";

function AddFriendsToGroup(props) {
  const { open, onClose, group, alreadyIn, setAlreadyIn, isGroup } = props;
  const [search, setSearch] = useState("");
  const { user, setChat, friend } = useContext(DashboardContext);
  const [selected, setSelectedUser] = useState([]);
  //   const [pending, setPending] = useState([]);
  function handleOnClose(change) {
    setSelectedUser([]);
    onClose(change);
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
      // have to check is it temporary group if its you have to update group name
    }

    async function createGroup(group, users) {
      let _users = [...users, friend.id];
      _users.push(user.id);
      const data = await createNewGroup(group, _users);
      console.log(data);
      const _data = await getTheGroup(data.id);
      console.log(_data);
      // setChat(null);
      setChat(<GroupChatRoom group={_data} />);
    }
    let users = [];
    let name = "";
    selected.map((friend) => {
      users.push(friend.friend.id);
      //   setPending([...pending, friend]);
      name += friend.friend.username + ",";
      setAlreadyIn([...alreadyIn, friend.friend.id]);
    });
    if (isGroup) {
      createUserToGroup(users);
    } else {
      const group = {
        isDirect: false,
        name: user.username + "," + friend.username + "," + name,
      };
      createGroup(group, users);
    }
    handleOnClose(1);
    // console.log(alreadyIn);
  }

  return (
    // <div>dsds</div>
    <div>
      <Dialog open={open} onClose={() => handleOnClose(0)}>
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
                      handleSelection={() => handleSelection()}
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
              onClick={() => handleSubmit()}
            >
              add
            </Button>
            <Button
              style={{ backgroundColor: "whitesmoke" }}
              onClick={() => handleOnClose(0)}
            >
              cancle
            </Button>
          </div>
          <Divider />
        </div>
      </Dialog>
    </div>
  );
}

export default AddFriendsToGroup;
