import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  Switch,
} from "react-router-dom";
import { Auth, Hub } from "aws-amplify";

import ChatDashboard from "../Components/ChatDashboard";
import ChatRoomList from "../Components/ChatRoomList";
import { Divider } from "@material-ui/core";
import Selection from "./../Components/Selection";
import MenuBar from "../Components/MenuBar";
import AllChats from "../Components/AllChats";

import { getLoggedInUser } from "./../api/queries";
import SideBar from "../Components/SideBar";
import Chat from "./../Components/Chat";
import Profile from "../Components/Profile";
import useStyles from "../Style/DashboardStyle";
// import firebase from "../firebase-messaging-sw";
export const DashboardContext = React.createContext();

const Dashboard = ({ match }) => {
  const [user, setUser] = useState(null);
  const [sideBar, setSideBar] = useState(null);
  const [chat, setChat] = useState(null);
  const [friend, setFriend] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
          console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function (err) {
          console.log("Service worker registration failed, error:", err);
        });
    }
    checkUserCurrent();

    // async function getUser() {
    //   const data = await getLoggedInUser();
    //   console.log(data);
    //   setUser(data.data.listUsers.items[0]);
    // }
    // getUser();
    console.log("Dashboard called");
    // sideBar ? setSideBar(sideBar) : setSideBar(<Profile user={user} />);

    return () => {
      console.log("clean up");
    };
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const checkUserCurrent = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("user: ", user);

      const data = await getLoggedInUser(user.attributes.sub);
      setUser(data.data.listUsers.items[0]);
      sideBar
        ? setSideBar(sideBar)
        : setSideBar(<Profile user={data.data.listUsers.items[0]} />);
    } catch (err) {
      // updateUser(null)
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        sideBar,
        setSideBar,
        chat,
        setChat,
        friend,
        setFriend,
      }}
    >
      <div className={classes.root}>
        <Selection />
        <Divider />
        <div className={classes.mainDrawerRoot}>
          <MenuBar match={match} />
          {/* <SideBar /> */}
          {/* <Divider orientation="vertical" flexItem /> */}
          {/* <Chat /> */}
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
