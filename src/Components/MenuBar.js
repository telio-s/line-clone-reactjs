import React, { useContext, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { Drawer, IconButton, Typography } from "@material-ui/core";
import {
  Person,
  PersonAdd,
  WatchLater,
  MoreHoriz,
  VolumeDownOutlined,
} from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import DirectChatRoom from "./DirectChatRoom";
import Profile from "./Profile";
import { DashboardContext } from "../Page/Dashboard";
import { ChatRoomListContext } from "./ChatRoomList";
import AddFriends from "./AddFriends";
import ChatRoomList from "./ChatRoomList";
import useStyles from "./../Style/DashboardStyle";
function MenuBar({ match }) {
  // const { menubarNoti } = useContext(ChatRoomListContext);
  const classes = useStyles();
  const [createGroup, setCreateGroup] = useState(false);
  const { user, setSideBar } = useContext(DashboardContext);
  const [countNotiIcon, setCountNotiIcon] = useState(0);

  // console.log(menubarNoti);
  function handleCreateGroupDialog() {
    setCreateGroup(!createGroup);
  }

  function handleProfileBar() {
    // console.log(user);
    setSideBar(<Profile user={user} />);
  }

  function handleAddFriends() {
    setSideBar(<AddFriends user={user} />);
  }

  async function handleChats() {
    await setSideBar(
      <ChatRoomList setNotificationIcon={setNotificationIcon} />
    );
  }

  const setNotificationIcon = (count) => {
    setCountNotiIcon(count);
  };

  return (
    <Router>
      <div style={{ width: "680px" }}>
        <Drawer
          variant="permanent"
          anchor="left"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <Link to={`${match.url}/profile`}>
            <IconButton
              disableRipple={true}
              className={classes.iconButton}
              // onClick={handleProfileBar}
            >
              <Person
                className={classes.iconMtDrawer}
                style={{ marginTop: "30px" }}
              />
            </IconButton>
          </Link>
          <Link to={`${match.url}/chats`}>
            <IconButton
              disableRipple={true}
              className={classes.iconButton}
              style={{ marginLeft: "7px" }}
              // onClick={handleChats}
            >
              <FontAwesomeIcon
                className={classes.iconAweDrawer}
                icon={faCommentDots}
              />
              {countNotiIcon ? (
                <div className={classes.notiBox}>
                  <Typography className={classes.noti}>
                    {countNotiIcon}
                  </Typography>
                </div>
              ) : null}
            </IconButton>
          </Link>
          <Link to={`${match.url}/addfriends`}>
            <IconButton
              disableRipple={true}
              className={classes.iconButton}
              // onClick={handleAddFriends}
            >
              <PersonAdd className={classes.iconMtDrawer} />
            </IconButton>
          </Link>
          <IconButton disableRipple={true} className={classes.iconButton}>
            <WatchLater className={classes.iconMtDrawer} />
          </IconButton>
          <IconButton disableRipple={true} className={classes.iconButton}>
            <FontAwesomeIcon
              className={classes.iconAweDrawer}
              icon={faNewspaper}
            />
          </IconButton>

          <div className={classes.drawerIconBottom}>
            <IconButton disableRipple={true} className={classes.iconButton}>
              <VolumeDownOutlined className={classes.iconMtDrawer} />
            </IconButton>
            <IconButton disableRipple={true} className={classes.iconButton}>
              <MoreHoriz className={classes.iconMtDrawer} />
            </IconButton>
          </div>
        </Drawer>

        <Switch>
          <Route path={`${match.path}/profile`}>
            <Profile />
          </Route>
          <Route path={`${match.path}/chats`}>
            <ChatRoomList setNotificationIcon={setNotificationIcon} />
          </Route>
          <Route path={`${match.path}/addfriends`}>
            <AddFriends user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default MenuBar;
