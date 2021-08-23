import { useContext } from "react";
import { DashboardContext } from "../Page/Dashboard";

function Chat() {
  const { chat } = useContext(DashboardContext);
  return <>{chat}</>;
}

export default Chat;
