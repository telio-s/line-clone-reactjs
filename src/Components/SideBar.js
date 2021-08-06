import React, { useContext, useState } from "react";
import { DashboardContext } from "./../Page/Dashboard";

function SideBar() {
  const { sideBar } = useContext(DashboardContext);
  return <div>{sideBar}</div>;
}

export default SideBar;
