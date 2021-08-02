import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { Drawer, ListItem, ListItemIcon, List } from "@material-ui/core";
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
import ChatDashboard from "../Components/ChatDashboard";

const Dashboard = () => {
  const classes = useStyles();
  const [component, setComponent] = useState(null);

  useEffect(() => {
    setComponent("chats");
  });

  const changeComponent = (key) => {
    switch (key) {
      case "chats":
        return <ChatDashboard />;
      case "friends":
        console.log(key);
        break;
      case "addFriend":
        console.log(key);
        break;
      case "timeline":
        console.log(key);
        break;
      case "news":
        console.log(key);
        break;
      case "mute":
        console.log(key);
        break;
      case "settings":
        console.log(key);
        break;
      default:
        return <ChatDashboard />;
    }
  };
  return (
    <Router>
      <div className={classes.root}>
        <div className={classes.mainDrawerRoot}>
          <Drawer
            variant="permanent"
            anchor="left"
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
          >
            <List>
              <ListItem
                button
                disableRipple={true}
                className={classes.iconButton}
                onClick={() => {
                  setComponent("friends");
                }}
              >
                <ListItemIcon>
                  <Person
                    className={classes.iconMtDrawer}
                    style={{ marginTop: "30px" }}
                  />
                </ListItemIcon>
              </ListItem>
              <ListItem
                button
                disableRipple={true}
                className={classes.iconButton}
                onClick={() => {
                  setComponent("chats");
                }}
              >
                <ListItemIcon style={{ paddingLeft: "5px" }}>
                  <FontAwesomeIcon
                    className={classes.iconAweDrawer}
                    icon={faCommentDots}
                  />
                </ListItemIcon>
              </ListItem>
              <ListItem
                button
                disableRipple={true}
                className={classes.iconButton}
                onClick={() => {
                  setComponent("addFriend");
                }}
              >
                <ListItemIcon>
                  <PersonAdd className={classes.iconMtDrawer} />
                </ListItemIcon>
              </ListItem>
              <ListItem
                button
                disableRipple={true}
                className={classes.iconButton}
                onClick={() => {
                  setComponent("timeline");
                }}
              >
                <ListItemIcon>
                  <WatchLater className={classes.iconMtDrawer} />
                </ListItemIcon>
              </ListItem>
              <ListItem
                button
                disableRipple={true}
                className={classes.iconButton}
                onClick={() => {
                  setComponent("news");
                }}
              >
                <ListItemIcon>
                  <FontAwesomeIcon
                    className={classes.iconAweDrawer}
                    icon={faNewspaper}
                  />
                </ListItemIcon>
              </ListItem>

              <div className={classes.drawerIconBottom}>
                <ListItem
                  button
                  disableRipple={true}
                  className={classes.iconButton}
                  onClick={() => {
                    setComponent("mute");
                  }}
                >
                  <ListItemIcon>
                    <VolumeDownOutlined className={classes.iconMtDrawer} />
                  </ListItemIcon>
                </ListItem>
                <ListItem
                  button
                  disableRipple={true}
                  className={classes.iconButton}
                  onClick={() => {
                    setComponent("settings");
                  }}
                >
                  <ListItemIcon>
                    <MoreHoriz className={classes.iconMtDrawer} />
                  </ListItemIcon>
                </ListItem>
              </div>
            </List>
          </Drawer>

          <main className={classes.main}>{changeComponent(component)}</main>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
