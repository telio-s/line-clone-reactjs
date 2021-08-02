import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { ListItem, Collapse } from "@material-ui/core";
import useStyles from "../Style/DashboardStyle";
import Groups from "./Groups";
import Friends from "./Friends";

function ProfileTest(props) {
  const { user } = props;
  const classes = useStyles();

  const [showGroups, setShowGroups] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  function handleShowGroups() {
    setShowGroups(!showGroups);
  }

  function handleShowFriends() {
    setShowFriends(!showFriends);
  }

  return (
    <div className={classes.root} style={{ width: "650px" }}>
      <main className={classes.main}>
        <h1>Profile, {user ? user.username : null}</h1>
        <ListItem
          button
          onClick={handleShowGroups}
          style={{ color: "rgb(83,86,106)" }}
        >
          Channels
          <div style={{ marginLeft: "auto" }}>
            {showGroups ? <ExpandLess /> : <ExpandMore />}
          </div>
        </ListItem>
        <Collapse in={showGroups} timeout="auto" unmountOnExit>
          <Groups showGroups={showGroups} user={user} />
        </Collapse>
        <ListItem
          button
          onClick={handleShowFriends}
          style={{ color: "rgb(83,86,106)" }}
        >
          Friends
          <div style={{ marginLeft: "auto" }}>
            {showFriends ? <ExpandLess /> : <ExpandMore />}
          </div>
        </ListItem>
        <Collapse in={showFriends} timeout="auto" unmountOnExit>
          <Friends showFriends={showFriends} user={user} />
        </Collapse>
      </main>
    </div>
  );
}

export default ProfileTest;
