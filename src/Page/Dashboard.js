import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
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

import useStyles from "../Style/DashboardStyle";
export const DashboardContext = React.createContext();

const Dashboard = () => {
  const [user, setUser] = useState();
  const [sideBar, setSideBar] = useState(null);
  const [chat, setChat] = useState(null);
  const [friend, setFriend] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    checkUserCurrent();

    // async function getUser() {
    //   const data = await getLoggedInUser();
    //   console.log(data);
    //   setUser(data.data.listUsers.items[0]);
    // }
    // getUser();
    console.log("Dashboard called");
    sideBar ? setSideBar(sideBar) : setSideBar(<AllChats />);
  }, []);

  const checkUserCurrent = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("user: ", user);

      const data = await getLoggedInUser(user.attributes.sub);
      console.log(data);
      console.log("ttgg");
      setUser(data.data.listUsers.items[0]);
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
          <MenuBar />
          <SideBar />
          <Divider orientation="vertical" flexItem />
          <Chat />
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
