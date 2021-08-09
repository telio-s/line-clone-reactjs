import { useContext } from "react";
import { DashboardContext } from "../Page/Dashboard";

function Chat() {
  const { chat } = useContext(DashboardContext);
  return (
    <div>
      <h1>{chat}</h1>
    </div>
  );
}

export default Chat;
