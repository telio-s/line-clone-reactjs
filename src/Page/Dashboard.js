import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import {
  Person,
  PersonAdd,
  WatchLater,
  MoreHoriz,
  VolumeDownOutlined,
} from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faNewspaper } from "@fortawesome/free-solid-svg-icons";

import useStyles from "../Style/DashboardStyle";
import ChatRoomList from "../Components/ChatRoomList";
import ChatRoom from "../Components/ChatRoom";

const Dashboard = () => {
  const classes = useStyles();

  const chatTypeSection = [
    { title: "All" },
    { title: "Friends" },
    { title: "Groups" },
  ];

  return (
    <div className={classes.root}>
      <div>
        <AppBar className={classes.appbar} elevation={0} position="static">
          <Toolbar>
            {chatTypeSection.map((obj, index) => (
              <Button
                disableRipple="true"
                key={index}
                className={classes.chatSection}
              >
                {obj.title}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      </div>
      <Divider />
      <div className={classes.mainDrawerRoot}>
        <Drawer
          variant="permanent"
          anchor="left"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <IconButton disableRipple="true" className={classes.iconButton}>
            <Person
              className={classes.iconMtDrawer}
              style={{ marginTop: "30px" }}
            />
          </IconButton>
          <IconButton disableRipple="true" className={classes.iconButton}>
            <FontAwesomeIcon
              className={classes.iconAweDrawer}
              icon={faCommentDots}
            />
          </IconButton>
          <IconButton disableRipple="true" className={classes.iconButton}>
            <PersonAdd className={classes.iconMtDrawer} />
          </IconButton>
          <IconButton disableRipple="true" className={classes.iconButton}>
            <WatchLater className={classes.iconMtDrawer} />
          </IconButton>
          <IconButton disableRipple="true" className={classes.iconButton}>
            <FontAwesomeIcon
              className={classes.iconAweDrawer}
              icon={faNewspaper}
            />
          </IconButton>

          <div className={classes.drawerIconBottom}>
            <IconButton disableRipple="true" className={classes.iconButton}>
              <VolumeDownOutlined className={classes.iconMtDrawer} />
            </IconButton>
            <IconButton disableRipple="true" className={classes.iconButton}>
              <MoreHoriz className={classes.iconMtDrawer} />
            </IconButton>
          </div>
        </Drawer>

        <main className={classes.main}>
          <ChatRoomList />
          <Divider orientation="vertical" flexItem />
          <ChatRoom />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
