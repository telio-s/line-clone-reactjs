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

const ChatDashboard = () => {
  const classes = useStyles();
  const chatTypeSection = [
    { title: "All" },
    { title: "Friends" },
    { title: "Groups" },
  ];
  return (
    <>
      <AppBar className={classes.appbar} elevation={0} position="static">
        <Toolbar>
          {chatTypeSection.map((obj, index) => (
            <Button
              disableRipple={true}
              key={index}
              className={classes.chatSection}
            >
              {obj.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Divider />
      <div className={classes.rootmain}>
        <ChatRoomList />
        <Divider orientation="vertical" flexItem />
        <ChatRoom />
      </div>
    </>
  );
};

export default ChatDashboard;
