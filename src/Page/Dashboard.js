import React, { useState, useEffect } from "react";
import { Divider } from "@material-ui/core";
import useStyles from "../Style/DashboardStyle";
import Selection from "./../Components/Selection";
import MenuBar from "../Components/MenuBar";
import AllChats from "../Components/AllChats";

import { getLoggedInUser } from "./../api/queries";
import SideBar from "../Components/SideBar";
import Chat from "./../Components/Chat";

export const DashboardContext = React.createContext();

const Dashboard = () => {
  const [user, setUser] = useState();
  const [sideBar, setSideBar] = useState(null);
  const [chat, setChat] = useState(null);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [alreadyIn, setAlreadyIn] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    async function getUser() {
      const data = await getLoggedInUser();
      setUser(data.data.listUsers.items[0]);
      setGroups(data.data.listUsers.items[0].groups.items);
      setFriends(data.data.listUsers.items[0].friends.items);
    }
    getUser();
    sideBar ? setSideBar(sideBar) : setSideBar(<AllChats />);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        user,
        sideBar,
        setSideBar,
        chat,
        setChat,
        groups,
        friends,
        setAlreadyIn,
        alreadyIn,
      }}
    >
      <div className={classes.root}>
        <Selection />
        <Divider />
        <div className={classes.mainDrawerRoot}>
          <MenuBar />
          <SideBar />
          <Chat />
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
