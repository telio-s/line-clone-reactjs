import React, { useState, useEffect } from "react";
import { Divider } from "@material-ui/core";
import useStyles from "../Style/DashboardStyle";
import Selection from "./../Components/Selection";
import MenuBar from "../Components/MenuBar";
import AllChats from "../Components/AllChats";

import { getLoggedInUser } from "../api/queries";
import SideBar from "../Components/SideBar";
import Chat from "./../Components/Chat";

export const DashboardContext = React.createContext();

const Dashboard = () => {
  const [user, setUser] = useState();
  const [sideBar, setSideBar] = useState(null);
  const [chat, setChat] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    async function getUser() {
      const data = await getLoggedInUser();
      console.log(data);
      setUser(data.data.listUsers.items[0]);
    }
    getUser();
    setSideBar(<AllChats />);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ user, sideBar, setSideBar, chat, setChat }}
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
