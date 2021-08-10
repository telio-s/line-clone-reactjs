import React, { useContext, useState } from "react";
import useStyles from "./../Style/DashboardStyle";
import { Drawer, IconButton } from "@material-ui/core";
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
import AddFriends from "./AddFriends";
function MenuBar() {
  const classes = useStyles();
  const [createGroup, setCreateGroup] = useState(false);
  const { user, setSideBar } = useContext(DashboardContext);

  function handleCreateGroupDialog() {
    setCreateGroup(!createGroup);
  }

  function handleProfileBar() {
    setSideBar(<Profile user={user} />);
  }

  function handleAddFriends() {
    setSideBar(<AddFriends user={user} />);
  }

  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <IconButton disableRipple={true} className={classes.iconButton}>
          <Person
            className={classes.iconMtDrawer}
            style={{ marginTop: "30px" }}
            onClick={handleProfileBar}
          />
        </IconButton>
        <IconButton disableRipple={true} className={classes.iconButton}>
          <FontAwesomeIcon
            className={classes.iconAweDrawer}
            icon={faCommentDots}
          />
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
        <CreateGroupDialog
          open={createGroup}
          onClose={handleCreateGroupDialog}
        />
      </Drawer>
    </div>
  );
}

export default MenuBar;
