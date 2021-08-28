import React, { useContext } from "react";
import { DashboardContext } from "./../Page/Dashboard";

function SideBar() {
  const { sideBar } = useContext(DashboardContext);
  return <>{sideBar}</>;
}

export default SideBar;
