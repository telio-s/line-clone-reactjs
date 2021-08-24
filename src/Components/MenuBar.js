import React, { useContext, useState } from "react";
import useStyles from "./../Style/DashboardStyle";
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
import CreateGroupDialog from "./CreateGroupDialog";
import Profile from "./Profile";
import { DashboardContext } from "../Page/Dashboard";
import { ChatRoomListContext } from "./ChatRoomList";
import AddFriends from "./AddFriends";
import ChatRoomList from "./ChatRoomList";
function MenuBar() {
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
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <IconButton
          disableRipple={true}
          className={classes.iconButton}
          onClick={handleProfileBar}
        >
          <Person
            className={classes.iconMtDrawer}
            style={{ marginTop: "30px" }}
          />
        </IconButton>
        <IconButton
          disableRipple={true}
          className={classes.iconButton}
          onClick={handleChats}
        >
          <FontAwesomeIcon
            className={classes.iconAweDrawer}
            icon={faCommentDots}
          />
          {countNotiIcon ? (
            <div className={classes.notiBox}>
              <Typography className={classes.noti}>{countNotiIcon}</Typography>
            </div>
          ) : null}
        </IconButton>
        <IconButton
          disableRipple={true}
          className={classes.iconButton}
          onClick={handleAddFriends}
        >
          <PersonAdd className={classes.iconMtDrawer} />
        </IconButton>
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
    </div>
  );
}

export default MenuBar;
