import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { DashboardContext } from "../Page/Dashboard";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import DirectChatRoom from "./DirectChatRoom";
import { ListItem, Collapse, Divider } from "@material-ui/core";
import useStyles from "../Style/ChatRoomListStyle";
import Chat from "./Chat";

function Profile(props) {
  const { setChat, user } = useContext(DashboardContext);
  let match = useRouteMatch();
  const classes = useStyles();

  const [showGroups, setShowGroups] = useState(true);
  const [showFriends, setShowFriends] = useState(true);

  // function handleShowGroups() {
  //   setShowGroups(!showGroups);
  // }

  function handleShowFriends() {
    setShowFriends(!showFriends);
  }

  function findChatName(obj) {
    for (let i = 0; i < 2; i++) {
      console.log(obj);
      if (obj.users.items[i].user.username !== user.username) {
        return <p>{obj.users.items[i].user.username}</p>;
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        width: `calc(100vw - ${80}px)`,
        marginLeft: "80px",
      }}
    >
      <div className={classes.root}>
        {/* {console.log(user.username)} */}
        <h1>Profile, {user ? user.username : null}</h1>
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
          {/* <Friends match={match} showFriends={showFriends} /> */}
          <div style={{ display: showFriends ? "" : "none" }}>
            {console.log(user)}
            {user.groups.items.map(
              (g, index) =>
                g.group.isDirect && (
                  <Link
                    key={index}
                    to={`${match.url}/${g.group.id}`}
                    style={{ textDecoration: "none", color: "#000000" }}
                  >
                    <ListItem
                      button
                      // onClick={() => handleDirectChatRoom(friend.friend)}
                    >
                      {findChatName(g.group)}
                    </ListItem>
                  </Link>
                )
            )}
          </div>
        </Collapse>

        <Divider orientation="vertical" flexItem />
      </div>
      <Switch>
        <Route
          exact
          path={`${match.path}/:idGroup`}
          component={DirectChatRoom}
        />
      </Switch>
    </div>
  );
}

export default Profile;
